"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { checkoutFormSchema } from "./check-out-client-wrapper";
import z from "zod";
import { MapPin, StoreIcon } from "lucide-react";

const arkhShopCooridinate: [number, number] = [27.719745, 85.3189327];

export default function Map({
  form,
  markerRef,
}: {
  form: UseFormReturn<
    z.infer<typeof checkoutFormSchema>,
    any,
    z.infer<typeof checkoutFormSchema>
  >;
  markerRef: React.RefObject<any>;
}) {
  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const shopMarkerRef = useRef<any>(null);
  const [, setRender] = useState<number>(0);

  useEffect(() => {
    let L: any;

    (async () => {
      const leaflet = await import("leaflet");
      L = leaflet;

      // define icons after import
      const customIcon = L.icon({
        iconUrl: "/icons/delivery.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const userIcon = L.icon({
        iconUrl: "/icons/person-current-location-indicator.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const arkshIcon = L.icon({
        iconUrl: "/icons/logo.webp",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      if (mapRef.current) return;

      const map = L.map("map").setView([27.7172, 85.324], 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Handle clicks
      map.on("click", (e: any) => {
        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng);
          form.setValue("latitude", e.latlng.lat);
          form.setValue("longitude", e.latlng.lng);
        } else {
          markerRef.current = L.marker(e.latlng, { icon: customIcon }).addTo(
            map
          );
        }
        setRender((r) => r + 1);
      });

      // Add shop marker
      if (!shopMarkerRef.current) {
        shopMarkerRef.current = L.marker(arkhShopCooridinate, {
          icon: arkshIcon,
        })
          .addTo(map)
          .bindPopup(
            `<div>
              <b>Arksh Food Shop </b><br/>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${arkhShopCooridinate[0]},${arkhShopCooridinate[1]}" target="_blank">
                Get Directions
              </a>
            </div>`
          )
          .openPopup();
      }

      // attach helper functions to refs so you can call them in buttons
      (map as any).__icons = { customIcon, userIcon };
    })();
  }, []);

  const clearMarker = () => {
    if (markerRef.current && mapRef.current) {
      mapRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
      setRender((r) => r + 1);
    }
  };

  const showMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude] as [
          number,
          number,
        ];

        if (mapRef.current) {
          mapRef.current.setView(latlng, 15);
        }

        const userIcon = (mapRef.current as any)?.__icons?.userIcon;

        if (!userMarkerRef.current && mapRef.current) {
          userMarkerRef.current = (window as any).L.marker(latlng, {
            icon: userIcon,
          })
            .addTo(mapRef.current)
            .bindPopup("You are here")
            .openPopup();
        } else if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng(latlng);
        }

        setRender((r) => r + 1);
      },
      (err) => {
        alert("Failed to get location: " + err.message);
      }
    );
  };

  const showStoreLocation = () => {
    if (mapRef.current) {
      mapRef.current.setView(arkhShopCooridinate, 15);
      if (shopMarkerRef.current) {
        shopMarkerRef.current.openPopup();
      }
    }
  };

  return (
    <div className="space-y-4 ">
      <Card className="shadow-none   border-none">
        <CardHeader>
          <CardTitle className="flex flex-col">
            Delivery point (optional)
            <span className="text-sm font-normal text-muted-foreground">
              Click on the map to set a custom delivery point
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div id="map" className="h-[500px] lg:w-full rounded-lg shadow" />
          <div className="mt-4 flex gap-2 flex-wrap">
            <Button type="button" variant="default" onClick={clearMarker}>
              Clear
            </Button>
            <Button type="button" variant="secondary" onClick={showMyLocation}>
              <MapPin /> Show My Location
            </Button>
            <Button
              type="button"
              className="w-full md:w-fit"
              variant="secondary"
              onClick={showStoreLocation}
            >
              <StoreIcon /> Show Shop Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

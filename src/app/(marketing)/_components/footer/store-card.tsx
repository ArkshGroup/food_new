import Image, { StaticImageData } from "next/image";
import { MapPin } from "lucide-react";

type StoreCardProps = {
  imageSrc: StaticImageData | string;
  title: string;
  subtitle?: string;
  mapsUrl?: string;
};

export default function StoreCard({
  imageSrc,
  title,
  subtitle,
  mapsUrl = "#",
}: StoreCardProps) {
  return (
    <div className="max-w-xl">
      <div className="relative overflow-hidden rounded-lg ring-1 ring-white/20">
        <button
          type="button"
          onClick={() => window.open(mapsUrl, "_blank")}
          aria-label={`Open ${title} location in Google Maps`}
          className="block w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#33A9F3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0756A3]"
        >
          <div className="relative h-52 w-full md:h-48">
            <Image
              src={imageSrc}
              alt={`${title} store front`}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0756A3]/60 via-transparent to-transparent" />
          </div>
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="rounded-md border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
            <h3 className="truncate text-sm font-semibold text-white">
              {title}
            </h3>
            {subtitle && (
              <div className="mt-1 flex items-center text-xs text-white/80">
                <MapPin className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                <span>{subtitle}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

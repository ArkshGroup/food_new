"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
 
 export function DeferredRender({
   children,
   fallback = null,
   rootMargin = "600px 0px",
 }: {
   children: React.ReactNode;
   fallback?: React.ReactNode;
   /** Start rendering before it scrolls into view. */
   rootMargin?: string;
 }) {
   const ref = useRef<HTMLDivElement | null>(null);
   const [shouldRender, setShouldRender] = useState(false);
 
   useEffect(() => {
     if (shouldRender) return;
 
     const el = ref.current;
     if (!el) return;
 
     const io = new IntersectionObserver(
       (entries) => {
         if (entries.some((e) => e.isIntersecting)) {
           setShouldRender(true);
           io.disconnect();
         }
       },
       { rootMargin },
     );
 
     io.observe(el);
     return () => io.disconnect();
   }, [rootMargin, shouldRender]);
 
   return <div ref={ref}>{shouldRender ? children : fallback}</div>;
 }


"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MonitorFrameProps {
  images: string[];
}

export default function MonitorFrame({ images }: MonitorFrameProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  return (
    <div className="relative w-full max-w-[90vw] lg:max-w-[50vw] xl:max-w-2xl mx-auto">
      {/* Monitor frame */}
      <div className="pb-8 bg-gray-800 rounded-t-lg lg:rounded-t-xl ">
        <div className="relative overflow-hidden bg-gray-900 rounded-lg aspect-video">
          <Image
            src={images[currentImageIndex]}
            alt={`Project showcase image ${currentImageIndex + 1}`}
            className="object-cover w-full h-full"
            fill
            objectFit="contain"
          />
        </div>
      </div>

      {/* Monitor stand */}
      <div className="w-1/3 h-4 mx-auto bg-gray-700 rounded-b-lg lg:h-5" />
      <div className="w-2/5 h-8 mx-auto bg-gray-600 rounded-b-lg lg:h-10" />

      {/* Monitor base */}
      <div className="w-3/5 h-2 mx-auto mt-1 bg-gray-800 rounded-full lg:h-3" />
    </div>
  );
}

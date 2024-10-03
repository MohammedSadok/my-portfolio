"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

interface MonitorFrameProps {
  children?: React.ReactNode;
  className?: string;
  color?: "black" | "silver" | "white";
  images: StaticImageData[];
  imageCount: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  top: string;
  left: string;
  rotate: string;
}

export default function MonitorFrame({
  children,
  className,
  color = "black",
  images,
  imageCount,
  containerRef,
  top,
  left,
  rotate,
}: MonitorFrameProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [zIndex, setZIndex] = useState<number>(0);

  const colorClasses = {
    black: "bg-gray-900 border-gray-800",
    silver: "bg-gray-300 border-gray-400",
    white: "bg-gray-100 border-gray-200",
  };

  const standColorClasses = {
    black: "bg-gray-800",
    silver: "bg-gray-400",
    white: "bg-gray-200",
  };

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");
    let maxZIndex = -Infinity;
    els.forEach((el) => {
      const zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );
      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
    setZIndex(maxZIndex + 1);
  };

  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, imageCount]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <motion.div
      onMouseDown={updateZIndex}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={cn(
        "relative mx-auto w-full max-w-[600px] drag-elements",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Monitor Frame */}
      <div
        className={cn(
          "relative rounded-xl overflow-hidden border-[12px]",
          colorClasses[color],
          "aspect-video"
        )}
      >
        {/* Screen */}
        <div className="absolute inset-0 overflow-hidden bg-white">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Monitor screen content ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                opacity: index === currentImageIndex ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ))}
          {children}
        </div>

        {/* Webcam */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/20"></div>
      </div>

      {/* Monitor Stand */}
      <div className="relative w-1/3 h-16 mx-auto">
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-3 rounded-b-xl",
            standColorClasses[color]
          )}
        ></div>
        <div
          className={cn(
            "absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-1/4",
            standColorClasses[color]
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2.5 rounded-lg",
            standColorClasses[color]
          )}
        ></div>
      </div>

      {/* Monitor Shadow */}
      <div className="absolute w-2/3 h-3 transform -translate-x-1/2 rounded-full -bottom-3 left-1/2 bg-black/10 blur-md"></div>
    </motion.div>
  );
}

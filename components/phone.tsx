"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";
interface PhoneFrameProps {
  className?: string;
  color?: "black" | "white" | "red";
  images: StaticImageData[];
  imageCount: number;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  top: string;
  left: string;
  rotate: string;
}

export default function PhoneFrame({
  className,
  color = "black",
  images,
  imageCount,
  containerRef,
  top,
  left,
  rotate,
}: PhoneFrameProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [zIndex, setZIndex] = useState<number>(0);

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
  const colorClasses = {
    black: "bg-gray-900",
    white: "bg-gray-100",
    red: "bg-red-500",
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
        "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]",
        colorClasses[color],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <div className="flex justify-center w-full h-[30px] bg-gray-900 dark:bg-gray-800">
          <div className="flex items-center justify-center w-40 h-full bg-black rounded-b-3xl">
            <div className="w-16 h-3 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        <div className="h-[542px] w-full overflow-hidden bg-white relative">
          {images.map((images, index) => (
            <Image
              key={index}
              src={images}
              alt={`Phone screen content ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                opacity: index === currentImageIndex ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import PhoneFrame from "./phone";
// Import all images
import { StaticImageData } from "next/image";
import img1 from "../public/smart_zitona/1.jpeg";
import img2 from "../public/smart_zitona/2.jpeg";
import img3 from "../public/smart_zitona/3.jpeg";
import img4 from "../public/smart_zitona/4.jpeg";
import img5 from "../public/smart_zitona/5.jpeg";

const images: StaticImageData[] = [img1, img2, img3, img4, img5];
// Component for draggable cards
export const DragCards = () => {
  return (
    <section className="relative grid w-full min-h-screen overflow-hidden place-content-center ">
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <PhoneFrame
        rotate="-3deg"
        top="35%"
        left="20%"
        color="black"
        imageCount={5}
        containerRef={containerRef}
        images={images}
      />
    </div>
  );
};

export default DragCards;

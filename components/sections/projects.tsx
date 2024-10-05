"use client";

import { myProjects } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import MonitorFrame from "../monitor";

export default function ProjectShowcase() {
  const { ref } = useSectionInView("Projects", 0.5);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const currentProject = myProjects[currentProjectIndex];

  const handleNavigation = (direction: "previous" | "next") => {
    setCurrentProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section
      className="flex flex-col w-full gap-10 p-8 mx-auto my-20 lg:flex-row"
      id="projects"
      ref={ref}
    >
      <div className="flex-1 w-full shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] rounded-md p-4">
        <div className="relative mb-6">
          <div className="absolute top-0 right-0 w-full h-96 rounded-xl">
            <Image
              src={currentProject.spotlight}
              alt="spotlight"
              className="object-cover w-full h-full rounded-xl"
              fill
            />
          </div>
          <div
            className="relative z-10 p-3 rounded-lg w-fit"
            style={currentProject.logoStyle}
          >
            <Image
              width={40}
              height={40}
              src={currentProject.logo}
              alt="Project logo"
              className="shadow-sm"
            />
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-white">
          {currentProject.title}
        </h2>
        <p className="mb-4 text-gray-300">{currentProject.desc}</p>
        <p className="mb-6 text-gray-400">{currentProject.subdesc}</p>

        <div className="flex flex-wrap gap-3 mb-6">
          {currentProject.tags.map((tag) => (
            <div key={tag.id} className="p-2 rounded bg-black-200">
              <Image src={tag.path} alt={tag.name} width={24} height={24} />
            </div>
          ))}
        </div>

        <a
          href={currentProject.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 transition-colors hover:text-blue-300"
        >
          Check Live Site
        </a>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => handleNavigation("previous")}
            className="z-50 p-2 transition-colors rounded-full bg-black-200 hover:bg-black-300"
            aria-label="Previous project"
          >
            <IconArrowBigLeftFilled className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className="z-50 p-2 transition-colors rounded-full bg-black-200 hover:bg-black-300"
            aria-label="Next project"
          >
            <IconArrowBigRightFilled className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)] rounded-md p-8">
        <MonitorFrame images={currentProject.tags.map((tag) => tag.path)} />
      </div>
    </section>
  );
}

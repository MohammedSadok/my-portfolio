"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LuBriefcase, LuCode, LuGraduationCap } from "react-icons/lu";

const experiencesData = [
  {
    title: "Graduated Bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: LuGraduationCap,
    date: "2019",
    type: "education",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: LuBriefcase,
    date: "2019 - 2021",
    type: "work",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: LuCode,
    date: "2021 - present",
    type: "freelance",
  },
];

const TimelineItem = ({
  item,
  index,
}: {
  item: (typeof experiencesData)[0];
  index: number;
}) => {
  const { ref } = useSectionInView("Experiences", 0.5);
  const refDiv = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refDiv,
    offset: ["start end", "center center"],
  });

  const isEven = index % 2 === 0;
  const xProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? 100 : -100, 0]
  );
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="experiences">
      <motion.div
        ref={refDiv}
        className="flex items-center justify-between w-full mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className={`w-5/12 ${isEven ? "text-right" : ""} `}
          style={{ x: xProgress, opacity: opacityProgress }}
        >
          {isEven ? (
            <div className="p-4 bg-gray-800 rounded-lg shadow-lg ">
              <h3 className="mb-2 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mb-2 text-gray-400">{item.location}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ) : (
            <p className="text-gray-400">{item.date}</p>
          )}
        </motion.div>

        <div className="flex justify-center w-2/12">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="relative z-10 flex items-center justify-center w-12 h-12 bg-purple-600 border-4 border-gray-900 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <item.icon className="text-xl text-white" />
            </motion.div>
          </div>
        </div>

        <motion.div
          className={`w-5/12 ${!isEven ? "text-right" : ""}`}
          style={{ x: xProgress, opacity: opacityProgress }}
        >
          {!isEven ? (
            <div className="p-4 bg-indigo-700 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20">
              <h3 className="mb-2 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mb-2 text-gray-400">{item.location}</p>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ) : (
            <p className="text-gray-400">{item.date}</p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default function CenteredIconTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden "
      id="experience"
      style={{ transform: "scale(0.9" }}
    >
      <h2 className="mb-16 text-3xl font-bold text-center text-white">
        My Experience
      </h2>

      <div className="relative">
        <motion.div
          className="absolute top-0 bottom-0 w-1 origin-top bg-gray-300 left-1/2"
          style={{ scaleY: lineHeight }}
          transition={{ duration: 0.3 }}
        />
        {experiencesData.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>

      <div className="absolute w-full h-full">
        <div className="w-full h-full z-[-10] opacity-70 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
}

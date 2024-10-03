"use client";

import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { motion } from "framer-motion";
import ProfileCard from "./profile";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="flex flex-col justify-center w-full h-full gap-5 m-auto text-start">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Let&apos;s Build
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              the Future{" "}
            </span>
            Together
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          I&apos;m a Full Stack Software Engineer with experience in Website,
          Mobile, and Software development. Check out my projects and skills.
        </motion.p>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="flex items-center justify-center w-full h-full"
      >
        <ProfileCard />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;

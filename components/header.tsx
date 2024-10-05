"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import { links } from "@/lib/data";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const lastClickedSection = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (lastClickedSection.current) {
        // If we've recently clicked a link, don't update based on scroll
        return;
      }

      const sections = links.map((link) => document.querySelector(link.hash));
      const currentSection = sections.findIndex((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (currentSection !== -1) {
        setActiveSection(links[currentSection].name);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof links)[0]
  ) => {
    e.preventDefault();
    lastClickedSection.current = link.name;
    setTimeOfLastClick(Date.now());
    setActiveSection(link.name);

    const section = document.querySelector(link.hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        lastClickedSection.current = null;
      }, 1000); // Reset after 1 second
    }
  };

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed left-1/2 border border-white border-opacity-10 bg-white/10 shadow-lg shadow-black/[0.15] backdrop-blur-[20px] top-6 h-[3.25rem] w-[25rem] rounded-lg"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="flex fixed left-1/2 h-12 -translate-x-1/2 py-2 top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-300 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="relative flex items-center justify-center h-3/4"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-indigo-400 transition text-indigo-500 font-bold",
                  {
                    "text-white": activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={(e) => handleClick(e, link)}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-white/20 -z-10"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

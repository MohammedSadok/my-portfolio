import Contact from "@/components/contact";
import Experience from "@/components/experience";

import Header from "@/components/header";
import Hero from "@/components/hero";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Hero />
      <Header />
      {/* <Intro /> */}
      {/* <SectionDivider />
      <About />
      <Projects /> */}
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}

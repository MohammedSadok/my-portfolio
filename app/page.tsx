import Experience from "@/components/sections/experiences";

import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 mx-auto font-sans max-w-7xl">
      <Header />
      <Hero />
      <Projects />
      <Experience />
    </main>
  );
}

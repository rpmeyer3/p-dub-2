import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BinaryRow } from "@/components/binary-decoration";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <BinaryRow seed={17} />
        <About />
        <BinaryRow seed={42} />
        <Experience />
        <BinaryRow seed={88} />
        <Projects />
        <BinaryRow seed={3} />
        <Skills />
        <BinaryRow seed={61} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

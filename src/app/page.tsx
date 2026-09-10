import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ContentCreation } from "@/components/sections/ContentCreation";
import { Packages } from "@/components/sections/Packages";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Specializations } from "@/components/sections/Specializations";
import { Hero } from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Philosophy />
      <Services />
      <Specializations />
      <ContentCreation />
      <Packages />
      <Contact />
    </main>
  );
}

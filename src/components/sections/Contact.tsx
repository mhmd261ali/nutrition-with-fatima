import { Mail, Instagram } from "lucide-react";
import { contact, dietitian } from "@/data/site-content";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { NutrientParticles } from "@/components/motion/NutrientParticles";
import { mailto } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="section-space relative overflow-hidden bg-bg">
      <NutrientParticles
        className="absolute inset-0 h-full w-full opacity-70"
        density={0.45}
      />
      <div className="site-container relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <RevealText lines={[contact.heading]} className="section-display mb-6" />
          <p className="mb-10 max-w-xl text-lg leading-[2] text-ink">
            {contact.supporting}
          </p>
        </div>

        <div className="rounded-[36px] border border-heading/10 bg-surface p-8">
          <p className="text-xl font-medium text-heading">{dietitian.name}</p>
          <p className="mb-8 text-muted">{dietitian.title}</p>
          <div className="space-y-4">
            <a
              href={mailto(dietitian.email, "استشارة تغذية")}
              className="group flex items-center gap-3 text-heading transition-transform duration-300 hover:-translate-x-1"
            >
              <Mail strokeWidth={1.5} className="size-5" aria-hidden="true" />
              <span>{dietitian.email}</span>
            </a>
            <a
              href={dietitian.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-en flex items-center gap-3 text-heading transition-transform duration-300 hover:-translate-x-1"
            >
              <Instagram strokeWidth={1.5} className="size-5" aria-hidden="true" />
              <span>{dietitian.instagramHandle}</span>
            </a>
          </div>
          <div className="mt-10 flex flex-col gap-3">
            <MagneticButton
              href={mailto(dietitian.email, "استشارة تغذية")}
              variant="secondary"
              className="w-full"
            >
              {contact.ctaEmail}
            </MagneticButton>
            <MagneticButton
              href={dietitian.instagram}
              external
              variant="secondary"
              className="w-full"
            >
              {contact.ctaInstagram}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

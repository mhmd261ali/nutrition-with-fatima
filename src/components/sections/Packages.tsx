import { packages } from "@/data/site-content";
import { RevealText } from "@/components/motion/RevealText";
import { PackageCard } from "@/components/ui/PackageCard";

export function Packages() {
  return (
    <section id="packages" className="section-space bg-surface-warm">
      <div className="site-container">
        <div className="mb-12 max-w-2xl">
          <RevealText lines={[packages.heading]} className="section-display" />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.items.map((item, index) => (
            <PackageCard
              key={item.id}
              pkg={item}
              delay={index * 0.08}
              followUpSessions={packages.monthlyFollowUpSessions}
              featuredLabel={packages.featuredLabel}
            />
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-heading/70">
          {packages.note}
        </p>
      </div>
    </section>
  );
}

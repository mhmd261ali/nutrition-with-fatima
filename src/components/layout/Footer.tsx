import { dietitian, footer, navigation } from "@/data/site-content";
import { BrandMark } from "@/components/ui/BrandMark";
import { mailto } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-heading/10 bg-surface">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <BrandMark size="md" />
            <div>
              <p className="font-medium text-heading">{dietitian.name}</p>
              <p className="text-[13px] text-muted">{dietitian.englishTitle}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-heading/70">
            {footer.statement}
          </p>
        </div>

        <nav aria-label="روابط التذييل" className="grid gap-2 text-sm">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-heading/75 transition-colors hover:text-heading"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="grid gap-2 text-sm">
          <a
            href={mailto(dietitian.email, "استشارة تغذية")}
            className="text-heading/75 transition-colors hover:text-heading"
          >
            {dietitian.email}
          </a>
          <a
            href={dietitian.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-en text-heading/75 transition-colors hover:text-heading"
          >
            {dietitian.instagramHandle}
          </a>
        </div>
      </div>
      <div className="site-container flex flex-wrap items-center justify-between gap-3 border-t border-heading/10 py-5 text-xs text-muted">
        <p>
          © {year} {dietitian.name}
        </p>
        <p>{dietitian.title}</p>
      </div>
    </footer>
  );
}

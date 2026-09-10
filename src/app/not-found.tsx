import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 py-24">
      <div className="text-center">
        <BrandMark size="md" className="mx-auto mb-6" />
        <h1 className="section-display mb-4">الصفحة غير موجودة</h1>
        <p className="mb-8 text-ink">عذراً، لم نتمكن من العثور على هذه الصفحة.</p>
        <Link
          href="/"
          className="bg-heading text-bg inline-flex rounded-full px-6 py-3"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </main>
  );
}

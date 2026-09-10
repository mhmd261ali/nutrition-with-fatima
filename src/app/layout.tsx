import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import { dietitian, siteMeta } from "@/data/site-content";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-english",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  applicationName: dietitian.name,
  authors: [{ name: dietitian.name }, { name: dietitian.englishName }],
  keywords: [
    "فاطمة شعيب",
    "أخصائية تغذية",
    "التغذية والحميات",
    "التغذية العلاجية",
    "إدارة الوزن",
    "خطط غذائية",
    "Fatima Shoaib",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteMeta.locale,
    url: siteMeta.url,
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: `${dietitian.name} | ${dietitian.title}`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F6F4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteMeta.url}/#person`,
      name: dietitian.name,
      alternateName: dietitian.englishName,
      jobTitle: dietitian.title,
      email: dietitian.email,
      url: siteMeta.url,
      sameAs: [dietitian.instagram],
      knowsLanguage: ["ar"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteMeta.url}/#service`,
      name: `${dietitian.name} | ${dietitian.title}`,
      description: siteMeta.description,
      url: siteMeta.url,
      email: dietitian.email,
      founder: { "@id": `${siteMeta.url}/#person` },
      availableLanguage: ["ar"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${manrope.variable}`}
    >
      <body className="bg-bg text-ink antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

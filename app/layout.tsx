import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    "https://ivashkov2022-droid.github.io/vazuri-preview-liko-fashion-studio-public/",
);
const ogImage = new URL("og.png", siteUrl).href;
const favicon = new URL("favicon.svg", siteUrl).href;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "ALTERA — Fashion Branding Concept Case | VAZURI",
  description:
    "ALTERA is a VAZURI concept case for a fashion and branding studio website, combining editorial art direction, identity and digital experience.",
  keywords: [
    "fashion website design",
    "branding studio website",
    "editorial web design",
    "digital art direction",
    "VAZURI case study",
  ],
  alternates: { canonical: siteUrl.href },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "ALTERA — Fashion Branding Concept Case | VAZURI",
    description:
      "A VAZURI concept case combining editorial art direction, identity and digital experience.",
    type: "website",
    url: siteUrl.href,
    siteName: "VAZURI",
    images: [
      {
        url: ogImage,
        width: 1680,
        height: 941,
        alt: "ALTERA fashion branding concept by VAZURI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALTERA — Fashion Branding Concept Case | VAZURI",
    description:
      "A VAZURI concept case combining editorial art direction, identity and digital experience.",
    images: [ogImage],
  },
  icons: {
    icon: [{ url: favicon, type: "image/svg+xml" }],
    shortcut: favicon,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "ALTERA — Fashion Branding Concept Case",
    description:
      "A VAZURI concept case for a fashion and branding studio website, combining editorial art direction, identity and digital experience.",
    url: siteUrl.href,
    image: ogImage,
    inLanguage: "en",
    creator: { "@type": "Organization", name: "VAZURI", url: "https://vazuri.ru/" },
    isPartOf: { "@type": "WebSite", name: "VAZURI", url: "https://vazuri.ru/" },
    keywords: "fashion website design, branding studio website, editorial web design, digital art direction",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}

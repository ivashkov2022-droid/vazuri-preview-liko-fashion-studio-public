import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://altera-fashion-studio.ivv2.chatgpt.site"),
  title: "ALTERA — Fashion & Branding Studio",
  description: "Fashion strategy, identity, campaigns and digital experiences from Moscow to the world.",
  openGraph: {
    title: "ALTERA — Fashion & Branding Studio",
    description: "Bold fashion identities, campaigns and digital experiences.",
    type: "website",
    images: [{ url: "/og.png", width: 1680, height: 941, alt: "ALTERA Fashion & Branding Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALTERA — Fashion & Branding Studio",
    description: "Bold fashion identities, campaigns and digital experiences.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

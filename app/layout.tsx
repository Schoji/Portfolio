import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL } from "./site";

// IBM Plex is a superfamily, so the mono is a real monospace sibling of the
// sans rather than an unrelated face bolted on. Neither is a variable font on
// Google Fonts, hence the explicit weights.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    // Feed autodiscovery — emitted on every page, which is what readers expect.
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  title: {
    default: "Piotr Wittig — Mobile, Web & Embedded Developer",
    template: "%s | Piotr Wittig",
  },
  description:
    "Software developer building mobile apps, web platforms, and embedded systems. See projects like Until Done, Plan PM, Sortra and Your Path.",
  keywords: [
    "Piotr Wittig",
    "developer portfolio",
    "Flutter developer",
    "Next.js developer",
    "mobile app developer",
    "full stack developer",
    "Until Done app",
    "Plan PM",
    "Sortra",
    "software engineer",
    "React",
    "TypeScript",
    "technical writing",
    "ASD-STE100",
  ],
  authors: [{ name: "Piotr Wittig", url: "https://github.com/Schoji" }],
  creator: "Piotr Wittig",
  publisher: "Piotr Wittig",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Piotr Wittig — Mobile, Web & Embedded Developer",
    description:
      "Pragmatic developer building mobile apps, web platforms, and embedded systems. Check out my projects.",
    siteName: "Piotr Wittig Portfolio",
    images: [
      {
        url: "/prof_square.webp",
        width: 384,
        height: 384,
        alt: "Piotr Wittig",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Piotr Wittig — Mobile, Web & Embedded Developer",
    description:
      "Pragmatic developer building mobile apps, web platforms, and embedded systems.",
    images: ["/prof_square.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Piotr Wittig",
  url: "https://piotrwittig.com",
  sameAs: [
    "https://github.com/Schoji",
    "https://linkedin.com/in/piotr-wittig-357bb9369",
  ],
  jobTitle: "Software Developer",
  knowsAbout: [
    "Technical Writing",
    "ASD-STE100 Simplified Technical English",
    "Flutter",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Embedded Systems",
  ],
  email: "piotr.wittig@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning on <html>: the inline script in <head> adds the
  // `js` class before React hydrates, which React would otherwise report as a
  // server/client attribute mismatch.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks that scripting is live, before first paint. Everything Framer
            Motion reveals on scroll ships as opacity:0 in the server HTML, so
            globals.css keeps that content visible until this class appears. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

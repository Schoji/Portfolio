import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piotrwittig.com"),
  alternates: { canonical: "/" },
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
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piotrwittig.software"),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  title: "Piotr Wittig — Developer Portfolio",
  description:
    "Piotr Wittig is a pragmatic software developer building mobile apps, web platforms, and embedded systems. Explore projects like Until Done, Plan PM, Sortra, Your Path and more.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Piotr Wittig — Developer Portfolio",
    description:
      "Pragmatic developer building mobile apps, web platforms, and embedded systems. Check out my projects.",
    siteName: "Piotr Wittig Portfolio",
    images: [
      {
        url: "/prof_square.png",
        width: 384,
        height: 384,
        alt: "Piotr Wittig",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Piotr Wittig — Developer Portfolio",
    description:
      "Pragmatic developer building mobile apps, web platforms, and embedded systems.",
    images: ["/prof_square.png"],
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
  url: "https://piotrwittig.software",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Khojii | Offbeat Adventures & Unique Stays in India",
    template: "%s | Khojii"
  },
  description: "Discover India's most unique adventures, luxury stays, and memorable experiences. Book paragliding, luxury sailing, and offbeat stays across India.",
  keywords: ["adventure", "travel", "India", "luxury stays", "villas", "water sports", "paragliding"],
  authors: [{ name: "Khojii" }],
  creator: "Khojii",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://khojii.com",
    siteName: "Khojii",
    title: "Khojii | Offbeat Adventures & Unique Stays in India",
    description: "Discover India's most unique adventures, luxury stays, and memorable experiences.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Khojii Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khojii | Offbeat Adventures & Unique Stays in India",
    description: "Discover India's most unique adventures, luxury stays, and memorable experiences.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} font-sans`} suppressHydrationWarning={true}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

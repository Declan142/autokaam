import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AutoKaam — India ka #1 AI Tool Comparison Platform",
    template: "%s | AutoKaam",
  },
  description:
    "Compare 50+ AI tools with Indian pricing (INR), Hindi guides, and honest reviews. ChatGPT vs Claude, Midjourney vs DALL-E, and more — sab Hindi mein samjho.",
  metadataBase: new URL("https://autokaam.com"),
  openGraph: {
    siteName: "AutoKaam",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

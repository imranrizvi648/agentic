import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Ryno - AI Agency",
  description: "Premium AI Experience",
};

export default function RootLayout({ children }) {
  return (
    /* FIX 3: Removed h-full from html and min-h-full from body.
       These fixed heights prevent Lenis from calculating full page scroll height.
       Use min-h-screen on body instead via CSS only. */
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="preload" as="image" href="/webgl-1.webp" />
        <link rel="preload" as="image" href="/webgl-2.webp" />
        <link rel="preload" as="image" href="/webgl-3.webp" />
        <link rel="preload" as="image" href="/webgl-4.webp" />
        <link rel="preload" as="image" href="/webgl-6.webp" />
      </head>
      <body className="flex flex-col">
        <SmoothScroll>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
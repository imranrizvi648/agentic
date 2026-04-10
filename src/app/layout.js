import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- Navbar ko yahan import karein
import Footer from "@/components/Footer";
import MagneticCursor from "@/components/MagneticCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ryno - AI Agency",
  description: "Premium AI Experience",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        {/* Navbar yahan aayega taaki har page par dikhe */}
        <Navbar /> 
        {/* <MagneticCursor/> */}
        
        {/* Main content yahan render hoga */}
        <main className="grow">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
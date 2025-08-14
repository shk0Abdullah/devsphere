import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav"; // client component
import Script from "next/script";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevSphere-AI Development Company",
  description: "We build AI Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          strategy="beforeInteractive"
        />
        <Script src="utils/sphere.js" type="module"></Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 bg-black min-h-screen`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}

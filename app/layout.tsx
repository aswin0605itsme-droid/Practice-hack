import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "HyperScale — Next-Gen Distributed Cloud & Edge Platform",
  description:
    "Deploy globally distributed web applications with sub-millisecond edge latency, autonomous scaling, zero cold starts, and enterprise-grade security.",
  keywords: [
    "cloud computing",
    "edge runtime",
    "serverless",
    "next.js",
    "web performance",
    "distributed systems",
  ],
  authors: [{ name: "HyperScale Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

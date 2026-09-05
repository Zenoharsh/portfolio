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

import InteractiveBackground from "./components/InteractiveBackground";

export const metadata: Metadata = {
  title: "Harsh Raj — Full-Stack & AI Developer",
  description:
    "Portfolio of Harsh Raj — Full-Stack & AI Developer. Available for work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col relative bg-transparent">
        <InteractiveBackground />

        {children}
      </body>
    </html>
  );
}

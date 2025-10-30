import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/bricolage_grotesque/bricolage_variable.ttf",
  variable: "--font-bricolage",
});

const dmSans = localFont({
  src: "./fonts/dm_sans/dm_sans_variable.ttf",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "SkyCast | Forecasts made simple.",
  description:
    "A fast, responsive weather app built with Next.js that delivers real-time forecasts, interactive maps, and personalized updates—all with a sleek, modern interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

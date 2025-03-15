"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background:
            "linear-gradient(90deg, rgba(16,25,43,1) 0%, rgba(54,84,145,1) 35%, rgba(16,25,43,1) 100%)",
          backgroundSize: "200% 200%",
        }}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

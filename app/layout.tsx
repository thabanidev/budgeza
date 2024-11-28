import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "next-themes";
import TopNav from "@/components/top-nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Budgeza",
  description: "A simple, free expense and budget tracking application",
  keywords: ['Budgeza', 'Budget tracking application', 'Expense tracking application', 'budget', 'expense'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
    <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <title>Budgeza | Expense and Budget Tracking</title>
    </head>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
    >
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
        <div className="w-full md:max-w-4xl lg:max-w-5xl mx-auto flex items-center justify-center p-0 md:p-4">
            <TopNav />
        </div>
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}

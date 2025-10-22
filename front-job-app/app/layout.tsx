import type { Metadata } from "next";
import { Geist, Geist_Mono, Julius_Sans_One, Jura } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const juliusSansOne = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-julius",
});
const jura = Jura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jura",
});

export const metadata: Metadata = {
  title: "Application Management",
  description: "A web app to manage my job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${juliusSansOne.variable} ${jura.variable} antialiased h-full`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Arimo, Jura } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ModalProvider } from "./utils/context/AddModalContext";
import CreateJobModal from "./components/CreateJobModal";
import { ShowToastProvider } from "./utils/context/ShowToastContext";
import ToastComponent from "./components/ToastComponent";

const arimo = Arimo({
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
        className={`${arimo.variable} ${jura.variable} antialiased h-full relative`}
      >
        <ModalProvider>
          <Header />
          <ShowToastProvider>
            <ToastComponent />
            <CreateJobModal />

            {children}
          </ShowToastProvider>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}

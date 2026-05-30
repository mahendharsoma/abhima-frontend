import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingPill from "@/components/FloatingPill";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-main",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "ABHIMA",
  description:
    "ABHIMA ",

  icons: {
    icon: "/images/superlogo.png",
    shortcut: "/images/superlogo.png",
    apple: "/images/superlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/images/superlogo.png" />
        <link rel="shortcut icon" type="image/png" href="/images/superlogo.png" />
        <link rel="apple-touch-icon" href="/images/superlogo.png" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingPill />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
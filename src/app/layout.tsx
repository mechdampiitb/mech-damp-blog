import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mech DAMP | IIT Bombay",
  description:
    "Course reviews, internship experiences, and roadmaps — by IITB Mech students, for IITB Mech students.",
  openGraph: {
    siteName: "Mech DAMP",
    title: "Mech DAMP | IIT Bombay",
    description:
      "Course reviews, internship experiences, and roadmaps — by IITB Mech students, for IITB Mech students.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
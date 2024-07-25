import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRCE BLOGS",
  description: "LLC Blogs for Fr. CRCE",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

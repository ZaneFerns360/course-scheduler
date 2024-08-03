// Code for the landing page
import React from "react";
import BlogComponent from "@/components/blogs";
import LoadingNavbar from "@/components/LoadingNavbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Hero from "@/components/Hero";
import Link from "next/link";
import Testimonials from "@/components/testamonials";

export default function Home() {
  return (
    <>
      <LoadingNavbar />
      <main className="relative bg-transparent flex-col min-h-screen w-full items-center justify-center">
        <Image
          src={"/landing_bg.gif"}
          alt="Hero"
          height={1000}
          width={1000}
          className="-z-10 w-full h-screen"
        />
        <Link href={"/signin"}>
          <button className=" border-4 p-4 rounded-full border-white  text-white absolute left-[38vw] top-64 bg-transparent text-6xl font-bold">
            Get Started
          </button>
        </Link>
      </main>
      {/* <Testimonials/> */}
      <Footer />
    </>
  );
}

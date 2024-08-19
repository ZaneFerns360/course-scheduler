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
          src="/Landing_bg2.gif"
          alt="Hero"
          height={10000}
          width={1000}
          className="-z-10 w-full h-screen md:block hidden"
        />
        <Image
          src="/mobileLandingbg.gif"
          alt="Hero"
          height={10000}
          width={1000}
          className="-z-10 w-full h-screen md:hidden"
        />
        <Link href={"/signin"}>
          <button className=" border-2 rounded-full border-white  text-white absolute left-[23vw] top-[50vh] md:left-[43vw] md:top-[40vh] hover:scale-110 duration-200 ease-in-out bg-transparent px-10 py-4 text-xl md:text-4xl font-bold">
            Get Started
          </button>
        </Link>
      </main>
      {/* <Testimonials/> */}
      <Footer />
    </>
  );
}

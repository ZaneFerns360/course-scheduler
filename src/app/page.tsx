
import React from "react";
import BlogComponent from "@/components/blogs";
import LoadingNavbar from "@/components/LoadingNavbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-col min-h-screen items-center justify-center">
      <LoadingNavbar />
      <h1 className="text-6xl font-bold">Welcome to CRCE Blogs</h1>
      <Footer/>
      
 
    </main>
  );
}

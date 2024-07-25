import Navbar from "@/components/Navbar";
import Blogs from "@/components/blogs";

export default function Home() {
  return (
    <main className="flex-col min-h-screen items-center justify-center">
     <Navbar/> 
      <Blogs/>
    </main>
  );
}

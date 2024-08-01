"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  ArrowLeft,
  Home,
  Book,
  Search,
  Users,
  GraduationCap,
  NewspaperIcon,
  Calendar,
  Briefcase,
  Phone,
  MoveRight,
  Globe,
  Info,
  School,
  UserPlus,
  UserCheck,
  Target,
  Building2,
  FileText,
  FileCheck2,
  BookOpen,
  FileSignature,
  ClipboardCheck,
  SquarePlus,
  Award,
  FlaskConical,
  BadgeCheck,
  Library,
  MessageSquare,
  FolderGit2,
  Bell,
  MessageCircleWarning,
  Cpu,
  CircuitBoard,
  Cog,
  Atom,
  Code2,
  CreditCard,
  Images,
} from "lucide-react";

interface DropdownItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface DropdownContent {
  [key: string]: DropdownItem[];
}

const dropdownContent: DropdownContent = {
  Courses: [
    {
      name: "Autonomous Curriculum",
      href: "/academics/programs",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Academic/Holiday Calender",
      href: "/academics/departments",
      icon: <Calendar size={18} />,
    },
    {
      name: "Outreach Programmes",
      href: "/academics/online-courses",
      icon: <Users size={18} />,
    },
    {
      name: "List of MOU's",
      href: "/academics/programs",
      icon: <FileSignature size={18} />,
    },
    {
      name: "Examination",
      href: "/academics/departments",
      icon: <ClipboardCheck size={18} />,
    },
    {
      name: "Teaching Learning Process",
      href: "/academics/online-courses",
      icon: <GraduationCap size={18} />,
    },
    {
      name: "NAAC",
      href: "https://frcrce.ac.in/index.php/academics/research-development/publications",
      icon: <Award size={18} />,
    },
    {
      name: "Research & Development",
      href: "/research/publications",
      icon: <FlaskConical size={18} />,
    },
    {
      name: "IQAC-CRCE",
      href: "/research/funding",
      icon: <BadgeCheck size={18} />,
    },
    {
      name: "Library",
      href: "/research/funding",
      icon: <Library size={18} />,
    },
  ],
};

const Navbar: React.FC = () => {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const handleDropdown = (menu: string) => {
    if (dropdown === menu) {
      setDropdown(null);
    } else {
      setDropdown(menu);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSubmenu(null);
  };

  const openMobileSubmenu = (menu: string) => {
    setMobileSubmenu(menu);
  };

  const closeMobileSubmenu = () => {
    setMobileSubmenu(null);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 z-50 hidden w-full bg-gray-800 font-semibold text-white md:block">
        <div className="flex flex-col px-20 ">
          <div className="border-t border-gray-700"></div>
          <div className="flex h-fit py-2">
            <div className="flex w-1/4 items-center justify-center">
              <Link href="/home/home-page">
                <Image
                  src="/clogo.png"
                  alt="SRM Logo"
                  width={120}
                  height={500}
                  className="scale-x-125"
                />
              </Link>
            </div>
            <div className="flex w-3/4 flex-col pb-1.5">
              <div className="flex justify-end space-x-8 py-4 pr-14 ">
                <Link href={"/home/home-page"}>
                  <button className="flex items-center space-x-1 text-lg transition duration-300 hover:text-yellow-300">
                    <span>Home</span>
                  </button>
                </Link>
                {Object.keys(dropdownContent).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleDropdown(key)}
                    className="flex items-center space-x-1 text-lg transition duration-300 hover:text-yellow-300"
                  >
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <ChevronDown size={20} />
                  </button>
                ))}
                <Link href={"#testomany"}>
                  <button className="flex items-center space-x-1 text-lg transition duration-300 hover:text-yellow-300">
                    <span>Testimonies</span>
                  </button>
                </Link>
                <Link href={"/home/my-blogs"}>
                  <button className="flex items-center space-x-1 text-lg transition duration-300 hover:text-yellow-300">
                    <span>My Blogs</span>
                  </button>
                </Link>
                <Link href={"#contact"}>
                  <button className="flex items-center space-x-1 text-lg transition duration-300 hover:text-yellow-300">
                    <span>Contact</span>
                  </button>
                </Link>
                <Link href={"/new-post"}>
                  <button className="flex items-center space-x-1 transition duration-300 hover:text-yellow-300">
                    <SquarePlus size={27} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {dropdown && dropdownContent[dropdown] && (
        <div className="fixed top-[70px] z-40 hidden w-full bg-white text-black shadow-lg transition-all duration-300 ease-out md:block">
          <div className="container mx-auto px-8 py-12">
            <button
              className="absolute right-8 top-8 text-xl text-gray-600 hover:text-gray-800"
              onClick={() => setDropdown(null)}
            >
              <X size={30} />
            </button>
            <div className="mb-6">
              <h2 className="text-3xl font-bold capitalize">{dropdown}</h2>
            </div>
            <ul className="grid grid-cols-3 gap-x-8 gap-y-4">
              {dropdownContent[dropdown].map((item, index) => (
                <li key={index} className="group">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 text-lg font-semibold transition duration-300 hover:text-blue-600"
                  >
                    <span className="text-blue-500 transition-colors duration-300 group-hover:text-blue-600">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    <ChevronRight
                      className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      size={20}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}{" "}
      {/* Mobile Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-gray-900 font-semibold capitalize text-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/home/home-page">
            <Image
              src="/clogo.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-auto w-auto"
            />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="p-2 transition-colors hover:bg-gray-800"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform overflow-y-auto bg-gray-900 capitalize text-white transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between pb-6">
            <Image
              src="/clogo.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-auto w-auto"
            />
            <button
              className="p-2 transition-colors hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Menu Items */}
          <Link href={"/home/home-page"}>
            <button className="flex items-center justify-between w-full border-b border-gray-700 py-3 pb-2 text-left text-lg font-medium transition-colors hover:bg-gray-800">
              <span>Home</span>
            </button>
          </Link>

          {Object.keys(dropdownContent).map((key) => (
            <button
              key={key}
              onClick={() => openMobileSubmenu(key)}
              className="flex items-center justify-between border-b border-gray-700 py-3 pb-2 text-left text-lg font-medium transition-colors hover:bg-gray-800"
            >
              <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
              <ChevronRight size={20} />
            </button>
          ))}
          <Link href={"/"}>
            <button className="flex items-center justify-between w-full border-b border-gray-700 py-3 pb-2 text-left text-lg font-medium transition-colors hover:bg-gray-800">
              <span>Testimonies</span>
            </button>
          </Link>
          <Link href={"/home/my-blogs"}>
            <button className="flex items-center justify-between w-full border-b border-gray-700 py-3 pb-2 text-left text-lg font-medium transition-colors hover:bg-gray-800">
              <span>My Blogs</span>
            </button>
          </Link>
          <Link href={"/"}>
            <button className="flex items-center justify-between w-full border-b border-gray-700 py-3 pb-2 text-left text-lg font-medium transition-colors hover:bg-gray-800">
              <span>Contact</span>
            </button>
          </Link>
          <Link href={"/new-post"}>
            <button className="flex items-center justify-between border-b w-full border-gray-700 py-3 pb-2 text-left text-lg font-medium transition-colors hover:bg-gray-800">
              <span>New Post</span>
              <ChevronRight size={20} />
            </button>
          </Link>
        </div>
      </div>
      {/* Mobile Submenu */}
      <div
        className={`fixed inset-0 z-50 transform overflow-y-auto bg-gray-800 capitalize text-white transition-transform duration-300 ease-in-out md:hidden ${
          mobileSubmenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {mobileSubmenu && dropdownContent[mobileSubmenu] && (
          <div className="flex flex-col p-4">
            <button
              className="flex items-center pb-6 text-lg font-medium"
              onClick={closeMobileSubmenu}
            >
              <ArrowLeft size={24} className="mr-2" />
              Back
            </button>
            <h2 className="pb-4 text-2xl font-bold">
              {mobileSubmenu.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            {dropdownContent[mobileSubmenu].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center space-x-3 border-b border-gray-700 py-3 pb-2 text-lg transition-colors hover:bg-gray-700"
                onClick={toggleMobileMenu}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

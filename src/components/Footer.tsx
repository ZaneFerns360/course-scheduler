import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SquareArrowOutUpRight,
  Twitter,
  Instagram,
  Linkedin,
  Import,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <div className="pt-20">
      <footer className="border-t border-gray-200 bg-white py-8 text-gray-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-blue-900">
                Graduate Division
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Contact the Graduate Division
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Workshops and Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Graduate Publications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Organizational Chart (PDF)
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-blue-900">
                Our Sites
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    GSI Teaching & Resource Center
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    Graduate Lectures
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    Tanner Lectures
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    Back-Up Child Care
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    Graduate Mentoring Awards
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    SMART Mentoring
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center hover:text-blue-600"
                  >
                    Grad Dashboard (for Faculty & Staff)
                    <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-blue-900">
                Our Mission
              </h3>
              <p className="text-sm">
                The Graduate Division oversees graduate admissions, fellowships,
                grants, academic employment, preparation for teaching, mentoring
                activities, professional development, academic progress and
                degree milestones.
              </p>
              <h4 className="text-md mb-2 mt-4 font-semibold text-blue-900">
                Can't find something?
              </h4>
              <Link href="#" className="text-blue-600 hover:underline">
                Give Feedback
              </Link>
            </div>
            <div>
              <Link href="https://www.berkeley.edu" className="inline-block">
                <Image src="/clogo.png" alt="FrCRCE" className="mb-4 h-12 w-auto" height={1000} width={1000} />
              </Link>
              <p className="mb-4 text-sm">
                Learn more about the Campaign for Graduate Fellowships.
              </p>
              <Link
                href="#"
                className="rounded bg-yellow-500 px-4 py-2 font-semibold text-blue-900 transition duration-300 hover:bg-yellow-400"
              >
                Support Graduate Division
              </Link>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-blue-600">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-600">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-600">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between border-t border-gray-200 pt-8">
            <div className="space-x-4">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600"
              >
                Nondiscrimination
                <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600"
              >
                Accessibility
                <SquareArrowOutUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-gray-500">Copyright © 2024 Fr.CRCE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

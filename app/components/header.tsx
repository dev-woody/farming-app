import Link from "next/link";
import React, { Suspense } from "react";
import SignInBtn from "./signInBtn";

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-teal-600 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">Farmen</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 	flex flex-wrap items-center text-base justify-center">
          <Link href="" className="mr-5 hover:text-teal-600">
            회사 소개
          </Link>
          <Link href="" className="mr-5 hover:text-teal-600">
            이슈
          </Link>
          <Link href="/market" className="mr-5 hover:text-teal-600">
            마켓
          </Link>
          <Link href="" className="mr-5 hover:text-teal-600">
            커뮤니티
          </Link>
        </nav>
        <SignInBtn />
      </div>
    </header>
  );
}

import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { cookies } from "next/headers";
import SignInButton from "../styles/signinBtn";

export default function Header() {
  const cookieStore = cookies();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 md:justify-normal justify-between md:flex-row md:items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-teal-600 md:mb-0"
        >
          <span className="ml-3 text-xl">Farmen</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 	md:flex hidden flex-wrap items-center text-base justify-center">
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
        {cookieStore.get("ACCESS_TOKEN") === undefined ? (
          <Link
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            href="/auth/signIn"
          >
            LogIn
          </Link>
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  );
}

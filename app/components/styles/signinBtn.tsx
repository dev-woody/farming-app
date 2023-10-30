"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import HeaderMenu from "@/app/components/menu";

function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex">
        <Link href="/mypage/cart">
          <ShoppingBagIcon className="w-6 h-6 md:mr-4" />
        </Link>
        <Link href="/mypage" className="md:flex hidden items-center">
          <UserIcon className="w-6 h-6" />
          <span className="ml-2">
            <span className="text-teal-600 font-bold">{session.user.name}</span>
            님 환영합니다.
          </span>
        </Link>
        <div className="md:hidden flex justify-end md:w-1/3 ml-4">
          <HeaderMenu user={session.user} />
        </div>
      </div>
    );
  }

  return (
    <Link
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      href="/auth/signIn"
    >
      LogIn
    </Link>
  );
}

export default SignInButton;

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { accessAxios } from "../../api/createAPI";
import Cookies from "js-cookie";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import HeaderMenu from "@/app/components/menu";

const access_token = JSON.parse(Cookies.get("access_token") || "null");

export default function UserBtn() {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [authUser, setAuthUser] = React.useState<any>(null);

  useEffect(() => {
    if (!access_token) return;
    (async () =>
      accessAxios.get(`/api/users`).then((res) => setAuthUser(res.data)))();
    setMounted(true);
  }, []);

  if (mounted && authUser) {
    return (
      <div className="flex">
        <Link href="/mypage/cart">
          <ShoppingBagIcon className="w-6 h-6 md:mr-4" />
        </Link>
        <Link href="/mypage" className="md:flex hidden items-center">
          <UserIcon className="w-6 h-6" />
          <span className="ml-2">
            <span className="text-teal-600 font-bold">{authUser?.name}</span>님
            환영합니다.
          </span>
        </Link>
        <div className="md:hidden flex justify-end md:w-1/3 ml-4">
          <HeaderMenu authUser={authUser} />
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/auth/signIn"
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
    >
      SinIn
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 ml-1"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </Link>
  );
}

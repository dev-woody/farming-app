"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { accessAxios } from "../api/createAPI";
import Cookies from "js-cookie";

const access_token = JSON.parse(Cookies.get("access_token") || "null");

export default function SignInBtn() {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [authUser, setAuthUser] = React.useState<any>(null);

  useEffect(() => {
    if (!access_token) return;
    (async () =>
      accessAxios.get(`/api/users`).then((res) => setAuthUser(res.data)))();
    setMounted(true);
  }, []);

  if (mounted && authUser) {
    return <div> {authUser?.name}님 환영합니다. </div>;
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

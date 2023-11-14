"use client";

import Link from "next/link";
import { signOut } from "../api/users";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";

export default function MyPage() {
  const route = useRouter();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  // const { data: session } = useSession();

  return (
    <div className="container px-5 md:py-12 py-2 mx-auto">
      <div className="flex flex-col justify-start items-center">
        <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-white dark:text-white dark:shadow-none">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <Image
              width={100}
              height={100}
              src="/bgbanner.png"
              className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              alt="user-background"
            />
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-white-700">
              <Image
                width={100}
                height={100}
                className="h-full w-full rounded-full"
                src={
                  `/api/nest${user?.profile_img}` ||
                  "/2023-10-31T23-45-49.730Z_blank-profile-picture-973460_1280.png"
                }
                alt="profile"
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-bold text-teal-700">{user?.name}</h4>
            <p className="text-base font-normal text-gray-600">
              Product Manager
            </p>
          </div>
          <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-teal-700 ">17</p>
              <p className="text-sm font-normal text-gray-600">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-teal-700 ">9.7K</p>
              <p className="text-sm font-normal text-gray-600">Followers</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-teal-700 ">434</p>
              <p className="text-sm font-normal text-gray-600">Following</p>
            </div>
          </div>
          <div></div>
          <div className="flex w-full my-2 flex-wrap">
            <h1 className="sm:text-2xl text-xl font-medium title-font text-gray-900 lg:mb-2 mb-4">
              주문조회
            </h1>
            <Link
              href="#"
              aria-current="true"
              className="block px-4 py-4 w-full sm:text-xl text-lg rounded-lg text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
            >
              주문조회
            </Link>
          </div>
          <span className="w-full h-[1px] bg-gray-200"></span>
          <div className="mx-auto my-2 w-full">
            <div className="flex flex-col w-full bg-white rounded-lg text-gray-900 text-sm font-medium">
              <a
                href="#"
                aria-current="true"
                className="block px-4 py-4 w-full sm:text-xl text-lg rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
              >
                회원정보
              </a>
              <Link
                href="/mypage/cart"
                className="block px-4 py-4 w-full sm:text-xl text-lg rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
              >
                장바구니
              </Link>
              <a
                href="#"
                className="block px-4 py-4 w-full sm:text-xl text-lg rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
              >
                FAQ
              </a>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  localStorage.removeItem("access_token");
                  route.push("/");
                }}
                className="block text-start px-4 py-4 w-full sm:text-xl text-lg rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import HeaderMenu from "@/app/components/menu";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/api/users";

export default function SignInButton() {
  const { data: user } = useQuery({ queryKey: ["user"], queryFn: getUsers });
  // const user = await fetch(`http://localhost:3000/api/nest/users`, {
  //   headers: {
  //     cookie: `ACCESS_TOKEN=${accessToken}`,
  //   },
  // }).then((res) => res.json());
  // const [user, setUser] = useState<IUser>({
  //   uuid: "",
  //   user_id: "",
  //   name: "",
  //   profile_img: "",
  //   zip_code: 0,
  //   address: "",
  //   address_detail: "",
  //   email: "",
  //   phone: "",
  //   createdAt: "",
  //   deletedAt: "",
  //   updatedAt: "",
  // });

  // useEffect(() => {
  //   (async () => {
  //     const data = await (
  //       await fetch(`${process.env.NEXTAUTH_URL}/api/nest/users`)
  //     ).json();
  //     setUser(data);
  //   })();
  // }, []);
  // const { data: session } = useSession();

  // const cookieStore = cookies();
  // const onlogin = cookieStore.get("ACCESS_TOKEN");

  //         const res = await fetch(`${process.env.NEXTAUTH_URL}/api/nest/signIn`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             user_id: credentials?.user_id,
  //             password: credentials?.password,
  //           }),
  //         })
  //         const user = await res.json()
  if (user?.uuid) {
    return (
      <div className="flex">
        <Link href="/mypage/cart">
          <ShoppingBagIcon className="w-6 h-6 md:mr-4" />
        </Link>
        <Link href="/mypage" className="md:flex hidden items-center">
          <UserIcon className="w-6 h-6" />
          <span className="ml-2">
            <span className="text-teal-600 font-bold">{user?.name}</span>님
            환영합니다.
          </span>
        </Link>
        <div className="md:hidden flex justify-end md:w-1/3 ml-4">
          <HeaderMenu user={user} />
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

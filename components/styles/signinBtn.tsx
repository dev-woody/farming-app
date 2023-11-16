"use client";

import Link from "next/link";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import HeaderMenu from "@/components/menu";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/common/atom/loginState";
import { useEffect, useState } from "react";
import { getUsers } from "@/app/api/users";

export default function SignInButton() {
	const isLogin = useRecoilValue(LoginState);
	const isLoginCopy = JSON.parse(JSON.stringify(isLogin));
	const [user, setUser] = useState<any>({});

	useEffect(() => {
		if (isLogin) {
			(async () => {
				const user = await fetch("http://localhost:3000/api/nest/users").then(
					(res) => res.json(),
				);
				setUser(user);
			})();
		}
		setUser({});
	}, [isLogin]);

	return (
		<>
			{user?.success ? (
				<div className="flex">
					<Link href="/mypage/cart">
						<ShoppingBagIcon className="w-6 h-6 md:mr-4" />
					</Link>
					<Link href="/mypage" className="md:flex hidden items-center">
						<UserIcon className="w-6 h-6" />
						<span className="ml-2">
							<span className="text-teal-600 font-bold">
								{user?.data?.name}
							</span>
							님 환영합니다.
						</span>
					</Link>
					<div className="md:hidden flex justify-end md:w-1/3 ml-4">
						<HeaderMenu user={user?.data} />
					</div>
				</div>
			) : (
				<Link
					className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
					href="/signIn"
				>
					LogIn
				</Link>
			)}
		</>
	);
}

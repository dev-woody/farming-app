import Link from "next/link";
import SignInButton from "../styles/signinBtn";
import { Suspense } from "react";
// import { cookies } from "next/headers";

export default async function Header() {
	// const cookieStore = cookies();
	// const accessTokenObj = cookieStore.get("accessToken");
	// const refreshTokenObj = cookieStore.get("refreshToken");
	// const accessToken = accessTokenObj?.value;
	// const refreshToken = refreshTokenObj?.value;

	// console.log("accessToken : ", accessToken);
	// console.log("refreshToken : ", refreshToken);

	// let loginData;
	// let userInfo;
	// if (accessToken) {
	// 	loginData = await fetch("http://localhost:3000/api/nest/users", {
	// 		credentials: "include",
	// 		method: "GET",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 		},
	// 	}).then((res) => {
	// 		console.log(res);
	// 		return res.json();
	// 	});
	// 	userInfo = loginData?.data;
	// }

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
				<Suspense
					fallback={
						<Link
							className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
							href="/signIn"
						>
							LogIn
						</Link>
					}
				>
					<SignInButton />
				</Suspense>
			</div>
		</header>
	);
}

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { signIn } from "@/app/api/users";
import { useSetRecoilState } from "recoil";
import { LoginState } from "@/common/atom/loginState";
import { signIn } from "next-auth/react";

interface SubmitForm {
	user_id: string;
	password: string;
}

const schema = yup.object({
	user_id: yup.string().required("아이디를 입력해주세요."),
	password: yup.string().required("비밀번호를 입력해주세요."),
});

export default function SignIn() {
	const setLogin = useSetRecoilState(LoginState);

	// const { mutate } = useMutation(
	// 	(userData: SubmitForm) => signIn(userData.user_id, userData.password),
	// 	{
	// 		onSuccess: (data) => {
	// 			if (data.success) {
	// 				setLogin(() => true);
	// 				route.push("/");
	// 			}
	// 		},
	// 	},
	// );
	const route = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SubmitForm>({
		resolver: yupResolver(schema),
	});
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
				<div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
					<h1 className="title-font font-medium text-3xl text-gray-900">
						친환경 농산물을 저렴한 가격에
					</h1>
					<p className="leading-relaxed mt-4">
						Poke slow-carb mixtape knausgaard, typewriter street art gentrify
						hammock starladder roathse. Craies vegan tousled etsy austin.
					</p>
				</div>
				<form
					onSubmit={handleSubmit(
						async (data) => {
							signIn("credentials", {
								user_id: data.user_id,
								password: data.password,
								redirect: true,
								callbackUrl: "/",
							});
							// const { user_id, password } = data;
							// await fetch(`/api/nest/signIn`, {
							// 	method: "POST",
							// 	headers: {
							// 		"Content-Type": "application/json",
							// 	},
							// 	body: JSON.stringify({
							// 		user_id,
							// 		password,
							// 	}),
							// });
							// mutate(data);
						},
						(errors) => console.log(errors),
					)}
					className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
				>
					<h2 className="text-gray-900 text-lg font-medium title-font mb-5">
						로그인
					</h2>
					<div className="relative mb-4">
						<label
							htmlFor="user_id"
							className="leading-7 text-sm text-gray-600"
						>
							아이디
						</label>
						<input
							type="text"
							id="user_id"
							{...register("user_id")}
							className="w-full bg-white rounded border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
					<div className="relative mb-4">
						<label
							htmlFor="password"
							className="leading-7 text-sm text-gray-600"
						>
							비밀번호
						</label>
						<input
							type={"password"}
							id="password"
							{...register("password")}
							className="w-full bg-white rounded border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
					{/* <button className="mb-4 text-white bg-teal-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            네이버 로그인
          </button>
          <button className="mb-4 text-white bg-teal-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            카카오 로그인
          </button>
          <button className="mb-4 text-white bg-teal-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            구글 로그인
          </button> */}
					<button
						type="submit"
						className="text-white bg-teal-600 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
					>
						로그인
					</button>
					<p className="text-xs text-gray-500 mt-3">
						아직 회원이 아니신가요?
						<Link className="text-teal-600 mx-2" href="/signUp">
							회원가입
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}

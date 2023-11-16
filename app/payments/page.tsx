"use client";

import { useEffect, useState } from "react";
// import Seo from "../../components/layout/seo";
import AddressForm from "./components/addressForm";
import StSelect from "../../components/styles/selected";
import TossPay from "./components/toss";
import { accessAxios } from "../api/createAPI";
import StModal from "../../components/styles/modal";
import Image from "next/image";
import { saleRate } from "@/common/function/calculator";

export default function Home() {
	const [user, setUser] = useState({
		uuid: "",
		user_id: "",
		email: "",
		name: "",
		phone: "",
		address: "",
		address_detail: "",
		zipCode: "",
		createdAt: "",
		updatedAt: "",
	});

	const [isOpen, setIsOpen] = useState(false);
	const [cart, setCart] = useState<ServerRes<ICart>>({
		success: false,
		code: null,
		message: null,
		data: {
			uuid: "",
			cart_items: [],
		},
	});
	const cartData = cart?.data;
	const [price, setPrice] = useState(0);
	const [cuponePrice, setCuponePrice] = useState(0);

	const cart_amount = cartData!.cart_items.reduce((total, item) => {
		return total + item.amount;
	}, 0);

	const cart_total_amount = cartData!.cart_items.reduce((total, item) => {
		return total + item.total_amount;
	}, 0);

	useEffect(() => {
		(async () => {
			const response = await accessAxios.get("/api/nest/users").then((res) => {
				setUser(res.data);
			});
			const cart = await fetch("/api/nest/cart").then((res) => res.json());
			setCart(cart);
		})();
	}, []);

	return (
		<section className="body-font">
			<StModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				contents={
					<TossPay
						price={price}
						cuponePrice={cuponePrice}
						customerKey={user.uuid}
						orderId={user.uuid + new Date().getTime()}
						orderName={""}
						customerName={user.name}
						customerEmail={user.email}
						isUser={false}
					/>
				}
			/>
			<div className="container px-5 md:py-12 py-2 mx-auto">
				<div className="flex flex-col md:w-2/3 justify-center items-stretch mx-auto">
					<h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
						배송정보
					</h1>
					<AddressForm />
					<h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
						주문상품
					</h1>
					{cartData!.cart_items?.map((cartItem: ICartItems) => {
						return (
							<div className=" flex flex-col mb-4 rounded-lg bg-white p-6 shadow-md sm:justify-start">
								<div className="text-xl mb-4 font-bold">
									{cartItem.product.prod_name}
								</div>
								<div className="justify-between rounded-lg bg-white flex flex-col md:flex-row sm:justify-start">
									<Image
										width={160}
										height={100}
										src={`/api/nest${cartItem.product.thumbnail}`}
										alt="product-image"
										className="w-full rounded-lg sm:w-40"
									/>
									<div className="w-full px-4">
										{cartItem.cart_item_opts.map(
											(option: ICartItemOption, idx: number) => (
												<div
													key={idx}
													className="flex flex-col md:flex-row md:mb-2 sm:ml-4 sm:w-full sm:justify-between"
												>
													<div className="mt-5 sm:mt-0">
														<h2 className="text-lg font-semibold ">
															{option.prod_opt_val.opt_value} -{" "}
															{option.quantity}
															&nbsp;개
														</h2>
													</div>
													<div className="flex space-x-4">
														<p className="text-lg font-bold text-gray-900">
															{saleRate(
																option.prod_opt_val.opt_price * option.quantity,
																cartItem.product.sale_rate,
															)}
															&nbsp;원
														</p>
													</div>
												</div>
											),
										)}
									</div>
								</div>
								<div className="self-end mt-4 block text-xl  font-semibold">
									{cartItem.total_amount}&nbsp;원
								</div>
							</div>
						);
					})}
					<h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
						쿠폰 적립금
					</h1>
					<StSelect />
					<div className="mb-4"></div>
					<h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
						결제정보
					</h1>
					<div className=" flex mb-4 rounded-lg bg-white p-6 shadow-md sm:justify-start">
						<div className="flex flex-col w-full">
							<div className="flex justify-between w-full mb-2 text-lg">
								<p>상품금액</p>
								<p>{cart_total_amount}&nbsp;원</p>
							</div>
							<div className="flex justify-between w-full mb-2 text-lg">
								<p>판매금액</p>
								<p>{cart_amount}&nbsp;원</p>
							</div>
							<div className="flex justify-between w-full mb-2 text-lg">
								<p>할인금액</p>
								<p>-{cart_amount - cart_total_amount}&nbsp;원</p>
							</div>
							<div className="flex justify-between w-full mb-2 text-lg">
								<p>쿠폰 할인가</p>
								<p>얼마얼마</p>
							</div>
							<div className="flex justify-between w-full mb-2 text-lg">
								<p>적립 포인트</p>
								<p>얼마얼마</p>
							</div>
							<div className="flex justify-between w-full mb-2 text-lg">
								<p>배송비</p>
								<p>얼마얼마</p>
							</div>
							<h2 className="flex justify-between md:my-4 md:text-start text-center text-xl font-bold">
								<p>총액</p>
								<p>얼마얼마</p>
							</h2>
						</div>
					</div>

					<button
						className="mt-4 py-4 px-10 bg-teal-600 rounded-lg text-bold text-white text-lg spacing-2 hover:bg-teal-700 transition ease-in-out duration-200"
						onClick={() => setIsOpen(true)}
					>
						구매하기
					</button>
				</div>
			</div>
		</section>
	);
}

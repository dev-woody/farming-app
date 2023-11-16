import CheckBox from "@/styles/checkBox";

export default function AddressForm() {
	return (
		<div className=" bg-white rounded-lg shadow">
			<div className="px-5 pb-5">
				<input
					placeholder="이름"
					className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-teal-200 focus:bg-white dark:focus:bg-teal-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-teal-400"
				/>
				<input
					placeholder="전화번호"
					className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-teal-200 focus:bg-white dark:focus:bg-teal-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-teal-400"
				/>
				<div className="flex">
					<div className="flex-1 pr-2">
						<input
							readOnly
							placeholder="우편번호"
							className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-teal-200 focus:bg-white dark:focus:bg-teal-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-teal-400"
						/>
					</div>
					<div className="">
						<button className="text-white w-full px-10 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-teal-600  focus:border-blueGray-500 focus:bg-white dark:focus:bg-teal-400 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-teal-400">
							검색
						</button>
					</div>
				</div>
				<input
					readOnly
					placeholder="주소"
					className=" text-black   placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-teal-200 focus:bg-white dark:focus:bg-teal-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-teal-400"
				/>
				<input
					placeholder="상세주소"
					className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-teal-200 focus:bg-white dark:focus:bg-teal-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-teal-400"
				/>
				<div className="flex items-center pt-3">
					<CheckBox c_id="주소저장" c_label="주소 저장하기" />
					{/* <input
						type="checkbox"
						className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
					/>
					<label
						htmlFor="safeAdress"
						className="block ml-2 text-sm text-gray-900"
					>
						주소 저장하기
					</label> */}
				</div>
			</div>
		</div>
	);
}

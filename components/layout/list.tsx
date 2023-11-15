import Link from "next/link";

export default function SList() {
  return (
    <div className="mx-auto w-full">
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
        <a
          href="#"
          className="block px-4 py-4 w-full sm:text-xl text-lg rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
        >
          로그아웃
        </a>
      </div>
    </div>
  );
}

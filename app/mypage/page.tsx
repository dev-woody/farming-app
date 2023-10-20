import Link from "next/link";
import SList from "../components/layout/list";

export default function Home() {
  return (
    <div className="container px-5 md:py-12 py-2 mx-auto">
      <div className="flex flex-col justify-start items-center">
        <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-white dark:text-white dark:shadow-none">
          <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
            <img
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
              className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
            />
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-white-700">
              <img
                className="h-full w-full rounded-full"
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
                alt=""
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-bold text-teal-700">Adela Parkson</h4>
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
          <div className="flex w-full my-4 flex-wrap">
            <h1 className="sm:text-2xl text-xl font-medium title-font text-gray-900 lg:mb-0 mb-4">
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
          <SList />
        </div>
      </div>
    </div>
  );
}

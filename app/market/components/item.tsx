import Image from "next/image";
import Link from "next/link";

type ItemProps = {
  productInfo: any;
};

export default function ItemBox({ productInfo }: ItemProps) {
  const totalReviw = productInfo?.reviews.length;
  const reviewEval =
    productInfo?.reviews
      .map((item: any) => item.rating)
      .reduce((a: any, c: any) => a + c, 0) / totalReviw || 0;
  return (
    <div className="p-4 md:w-1/3 w-full">
      <Link href={`/market/${productInfo.uuid}`}>
        <div className="h-full rounded-lg overflow-hidden">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={`/api/nest${productInfo.thumbnail}`}
            alt="blog"
          />
          <div className="p-2">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {productInfo.category}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {productInfo.prd_name}
            </h1>
            <p className="leading-relaxed mb-3">{productInfo.description}</p>
            <div className="flex items-center flex-wrap justify-between">
              <p className="text-red-500 inline-flex items-center lg:mb-0">
                <span className="text-gray-400 line-through">
                  {productInfo.options[0]?.price} ₩
                </span>
                <svg
                  className="w-4 h-4 mx-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
                <span className="font-semibold">
                  {productInfo.options[0]?.sale_price} ₩
                </span>
              </p>
              <p>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  {reviewEval}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

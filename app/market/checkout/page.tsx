import Seo from "@/app/components/seo";
import TossPay from "@/app/payments/components/toss";
import UserAddress from "@/app/payments/components/addressForm";

export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <Seo title="Market" />
      <div className="container px-5 md:py-12 py-2 mx-auto"></div>
    </section>
  );
}

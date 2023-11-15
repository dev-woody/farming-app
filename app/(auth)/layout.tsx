import { Metadata } from "next";

export const metadata: Metadata = {
	// title: "Farmen",
};

export default function MyPageLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}

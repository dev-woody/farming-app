import Header from "@/components/layout/header";

export default function Home() {
	return (
		<>
			<div className="h-96 mb-10 overflow-hidden">
				<img
					alt="content"
					className="object-cover object-center h-full w-full"
					src="https://dummyimage.com/3600x1200"
				/>
			</div>
			<div className="flex flex-wrap -m-4 text-center">
				<div className="p-4 sm:w-1/4 w-1/2">
					<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
						2.7K
					</h2>
					<p className="leading-relaxed">Users</p>
				</div>
				<div className="p-4 sm:w-1/4 w-1/2">
					<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
						1.8K
					</h2>
					<p className="leading-relaxed">Subscribes</p>
				</div>
				<div className="p-4 sm:w-1/4 w-1/2">
					<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
						35
					</h2>
					<p className="leading-relaxed">Downloads</p>
				</div>
				<div className="p-4 sm:w-1/4 w-1/2">
					<h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
						4
					</h2>
					<p className="leading-relaxed">Products</p>
				</div>
			</div>
			{/* <p>안녕</p>
      <UploadImage /> 
	</section>*/}
		</>
	);
}

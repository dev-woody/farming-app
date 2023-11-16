declare interface ICartItemOption {
	uuid: string;
	opt_value: string;
	price: number;
	quantity: number;
	prod_opt_val: any;
}

declare interface ICartItems {
	uuid: string;
	opt_name: string;
	product: any;
	amount: number;
	total_amount: number;
	cart_item_opts: ICartItemOption[];
}

declare interface ICart {
	uuid: string;
	cart_items: ICartItems[];
}
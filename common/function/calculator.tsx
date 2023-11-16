export function saleRate(price: number, sale_rate: number) {
	return price - price * (sale_rate / 100);
}

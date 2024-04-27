export interface ProductPricesState {
	prices: ProductPrices;
	isLoading: boolean;
	error?: string;
}

export interface ProductPrices {
	minPrice: number;
	maxPrice: number;
	avgPrice: number;
}

import { FilterSortProps, SortSorting } from '@/features/sorts';
import { Currency } from '@/shared/types/localization';

export interface Product {
	_id: number;
	images: string[];
	title: string;
	creativity: number;
	filters: FilterSortProps[];
	characteristics: Record<string, string[] | Record<string, string>>;
	markets: MarketsProductData[];
	description?: string;
}

export interface MarketsProductData {
	market: MarketType;
	link: string;
	rating: number;
	reviewCount: number;
	currency: Currency;
	price: number;
	oldPrice?: number;
}

export type MarketType =
	| 'ozon'
	| 'yandex'
	| 'aliexpress'
	| 'wildberries'
	| 'sber';

export interface ProductState {
	data?: Product[];
	product?: Product;
	prices: ProductPrices;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}

export interface FindProductDto {
	limit: number;
	sort?: SortSorting;
	filters?: FilterSortProps[];
	maxPrice?: number;
	minPrice?: number;
}

export interface ProductPrices {
	minPrice: number;
	maxPrice: number;
	avgPrice: number;
}

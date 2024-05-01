import { FilterSortProps, SortSorting } from '@/features/sorts';
import { Currency } from '@/shared/types/localization';

export interface Product {
	_id: string;
	article: string;
	images: string[];
	title: string;
	creativity: number;
	filters: FilterSortProps[];
	characteristics: Record<string, string[] | Record<string, string>>;
	markets: MarketsProductData[];
	seoText?: string;
}

export interface CreateProductDto {
	images?: string[];
	title: string;
	creativity: number;
	filters: FilterSortProps[];
	characteristics: Record<string, string[] | Record<string, string>>;
	markets: MarketsProductDto[];
	seoText?: string;
}

export interface MarketsProductDto {
	market: MarketType;
	link: string;
	rating: number;
	reviewCount: number;
	price: number;
	oldPrice?: number;
}

export interface ProductState {
	product?: Product;
	isLoading: boolean;
	error?: string;
}

export interface ProductCard {
	images: string[];
	title: string;
	markets: MarketsProductData[];
	article: string;
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

export interface FindProductsDto {
	limit: number;
	sort?: SortSorting;
	// filters?: FilterSortProps[];
	filters?: string;
	maxPrice?: number;
	minPrice?: number;
}

export interface ProductPrices {
	minPrice: number;
	maxPrice: number;
	avgPrice: number;
}

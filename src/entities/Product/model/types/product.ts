import { FilterSortProps } from '@/features/Sorts';
import { Currency } from '@/shared/types/localization';

export interface Product {
	id: number;
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
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}

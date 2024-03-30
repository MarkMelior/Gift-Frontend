import { FilterSortProps } from '@/widgets/Sorts/model/types/sortType';
import { Currency } from './localization';

export interface ProductDataProps {
	id: number;
	images: string[];
	title: string;
	creativity: number;
	filter: FilterSortProps[];
	characteristics: Record<string, string[] | Record<string, string>>;
	markets: MarketsProductData[];
	tags?: string;
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

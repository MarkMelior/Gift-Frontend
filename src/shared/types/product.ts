import { Currency } from './localization';

export interface ProductDataProps {
	id: number;
	images: string[];
	title: string;
	creativity: number;
	filter: FilterProductData[];
	characteristics: Record<string, string>;
	markets: MarketsProductData[];
}

export type FilterProductData = 'birthday' | 'love' | 'new-year' | 'joke';

export interface MarketsProductData {
	market: MarketType;
	link: string;
	rating: number;
	reviewCount: number;
	currency: Currency;
	price: number;
	oldPrice?: number;
}

export type MarketType = 'ozon' | 'yandex';

import {
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
} from './model/api/products.api';
import {
	FindProductsDto,
	MarketType,
	MarketsProductData,
	Product,
	ProductCard,
	ProductState,
} from './model/types/products.type';
import { CardWide } from './ui/card-wide/card-wide';
import { Card } from './ui/card/card';
import { Cards, CardsProps } from './ui/cards/cards';

export {
	Card,
	CardWide,
	Cards,
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
};

export type {
	CardsProps,
	FindProductsDto,
	MarketType,
	MarketsProductData,
	Product,
	ProductCard,
	ProductState,
};

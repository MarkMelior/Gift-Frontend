import {
	toggleFavoritesProduct,
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
} from './model/api/products.api';
import { useProducts } from './model/hooks/useProducts';
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
	toggleFavoritesProduct,
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
	useProducts,
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

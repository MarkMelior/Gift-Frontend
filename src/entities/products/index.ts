import {
	addProduct,
	addProductImages,
	toggleFavoritesProduct,
	useAddProductMutation,
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
} from './api/products.api';
import { useProducts } from './hooks/useProducts';
import {
	CreateProductDto,
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
	addProduct,
	addProductImages,
	toggleFavoritesProduct,
	useAddProductMutation,
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
	useProducts,
};

export type {
	CardsProps,
	CreateProductDto,
	FindProductsDto,
	MarketType,
	MarketsProductData,
	Product,
	ProductCard,
	ProductState,
};

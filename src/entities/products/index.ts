import { getProductData } from './model/selectors/getProductData';
import { getProductError } from './model/selectors/getProductError';
import { getProductIsLoading } from './model/selectors/getProductIsLoading';
import { getProductPrices } from './model/selectors/getProductPrices';
import { fetchProductData } from './model/services/fetch-product-data';
import { productActions, productReducer } from './model/slice/product.slice';
import {
	MarketType,
	MarketsProductData,
	Product,
	ProductPrices,
	ProductState,
} from './model/types/product.type';
import { CardWide } from './ui/card-wide/card-wide';
import { Card } from './ui/card/card';
import { Cards, CardsProps } from './ui/cards/cards';

export {
	Card,
	CardWide,
	Cards,
	fetchProductData,
	getProductData,
	getProductError,
	getProductIsLoading,
	getProductPrices,
	productActions,
	productReducer,
};

export type {
	CardsProps,
	MarketType,
	MarketsProductData,
	Product,
	ProductPrices,
	ProductState,
};

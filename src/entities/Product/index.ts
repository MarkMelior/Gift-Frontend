import { Card } from '@nextui-org/react';
import { getProductData } from './model/selector/getProductData/getProductData';
import { getProductError } from './model/selector/getProductError/getProductError';
import { getProductIsLoading } from './model/selector/getProductIsLoading/getProductIsLoading';
import {
	MarketType,
	MarketsProductData,
	Product,
	ProductState,
} from './model/types/product';
import { CardWide } from './ui/CardWide/CardWide';
import { Cards, CardsProps } from './ui/Cards/Cards';

export {
	Card,
	CardWide,
	Cards,
	getProductData,
	getProductError,
	getProductIsLoading,
};

export type {
	CardsProps,
	MarketType,
	MarketsProductData,
	Product,
	ProductState,
};

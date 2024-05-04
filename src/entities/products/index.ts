import {
	addProduct,
	useAddProductMutation,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
} from './api/products.api';
import { CardWide } from './ui/card-wide/card-wide';
import { CardWideSkeleton } from './ui/card-wide/card-wide.skeleton';
import { Card } from './ui/card/card';
import { Cards, CardsProps } from './ui/cards/cards';

export {
	Card,
	CardWide,
	CardWideSkeleton,
	Cards,
	addProduct,
	useAddProductMutation,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
};

export type { CardsProps };

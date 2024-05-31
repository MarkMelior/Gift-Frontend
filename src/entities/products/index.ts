import {
	addProduct,
	deleteProduct,
	getProducts,
	updateProduct,
	useAddProductMutation,
	useGetProductQuery,
	useGetProductsQuery,
} from './api/products.api';
import { useProduct } from './hooks/useProduct';
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
	deleteProduct,
	getProducts,
	updateProduct,
	useAddProductMutation,
	useGetProductQuery,
	useGetProductsQuery,
	useProduct,
};

export type { CardsProps };

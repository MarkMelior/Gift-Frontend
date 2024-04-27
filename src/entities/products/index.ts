import { getProduct } from './model/selectors/getProduct';
import { getProductPrices } from './model/selectors/getProductPrices';
import { getProducts } from './model/selectors/getProducts';
import { getProductsFavorites } from './model/selectors/getProductsFavorites';
import { fetchFavoritesProducts } from './model/services/fetch-favorites-products';
import { fetchProductByArticle } from './model/services/fetch-product-by-article';
import { fetchProducts } from './model/services/fetch-products';
import { productReducer } from './model/slice/product.slice';
import { productsFavoritesReducer } from './model/slice/products-favorites.slice';
import { productsReducer } from './model/slice/products.slice';
import { ProductPricesState } from './model/types/product-prices.type';
import {
	MarketType,
	MarketsProductData,
	Product,
	ProductCard,
	ProductState,
} from './model/types/product.type';
import { ProductsState } from './model/types/products.type';
import { CardWide } from './ui/card-wide/card-wide';
import { Card } from './ui/card/card';
import { Cards, CardsProps } from './ui/cards/cards';

export {
	Card,
	CardWide,
	Cards,
	fetchFavoritesProducts,
	fetchProductByArticle,
	fetchProducts,
	getProduct,
	getProductPrices,
	getProducts,
	getProductsFavorites,
	productReducer,
	productsFavoritesReducer,
	productsReducer,
};

export type {
	CardsProps,
	MarketType,
	MarketsProductData,
	Product,
	ProductCard,
	ProductPricesState,
	ProductState,
	ProductsState,
};

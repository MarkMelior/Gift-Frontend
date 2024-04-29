import { rtkApi } from '@/shared/api/rtkApi';
import {
	FindProductsDto,
	Product,
	ProductCard,
	ProductPrices,
} from '../types/products.type';

export const productsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<Product[], FindProductsDto>({
			query: (dto) => ({
				url: '/products/find',
				method: 'GET',
				params: dto,
			}),
		}),
		getProductsPrice: build.query<ProductPrices, void>({
			query: () => ({
				url: `products/prices`,
				method: 'GET',
			}),
		}),
		getProduct: build.query<Product, string>({
			query: (productArticle) => ({
				url: `/products/${productArticle}`,
				method: 'GET',
			}),
		}),
		getFavoritesProducts: build.query<ProductCard[], void>({
			query: () => ({
				url: '/favorites',
				method: 'GET',
			}),
		}),
		toggleFavoritesProduct: build.mutation<void, string>({
			query: (article) => ({
				url: `/favorites/toggle/${article}`,
				method: 'PATCH',
			}),
		}),
	}),
});

export const toggleFavoritesProduct =
	productsApi.endpoints.toggleFavoritesProduct.initiate;

export const {
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
} = productsApi;

import { rtkApi } from '@/shared/api/rtkApi';
import {
	CreateProductDto,
	FindProductsDto,
	Product,
	ProductCard,
	ProductPrices,
} from '../model/types/products.type';

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
		deleteProductImages: build.mutation<
			string[],
			{ productArticle: string; images: string }
		>({
			query: ({ productArticle, images }) => ({
				url: `/products/images/${productArticle}/${images}`,
				method: 'DELETE',
			}),
		}),
		addProductImages: build.mutation<
			string[],
			{ productArticle: string; images: File[] }
		>({
			query: ({ productArticle, images }) => ({
				url: `/products/images/${productArticle}`,
				method: 'POST',
				body: images,
			}),
		}),
		addProduct: build.mutation<Product, CreateProductDto>({
			query: (dto) => ({
				url: `/products`,
				method: 'POST',
				body: dto,
			}),
		}),
	}),
});

export const toggleFavoritesProduct =
	productsApi.endpoints.toggleFavoritesProduct.initiate;

export const deleteProductImages =
	productsApi.endpoints.deleteProductImages.initiate;

export const addProductImages = productsApi.endpoints.addProductImages.initiate;

export const addProduct = productsApi.endpoints.addProduct.initiate;

export const {
	useGetFavoritesProductsQuery,
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
	useAddProductMutation,
} = productsApi;

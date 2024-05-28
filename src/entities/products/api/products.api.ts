import { rtkApi } from '@/shared/api/rtkApi';
import {
	ProductCreateRequest,
	ProductFindRequest,
	ProductResponse,
} from '@melior-gift/zod-contracts';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export const productsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<
			{ products: ProductResponse[]; totalProducts: number },
			ProductFindRequest
		>({
			query: (dto) => ({
				url: '/products',
				method: 'GET',
				params: dto,
			}),
			transformResponse: (
				response: ProductResponse[],
				meta: FetchBaseQueryMeta,
				args: ProductFindRequest,
			) => {
				const totalProducts = meta?.response?.headers.get('X-Total-Products');

				return { products: response, totalProducts: Number(totalProducts) };
			},
			providesTags: ['Products'],
		}),
		getProduct: build.query<ProductResponse, string>({
			query: (productArticle) => ({
				url: `/products/${productArticle}`,
				method: 'GET',
			}),
		}),
		addProduct: build.mutation<
			ProductResponse,
			{ body: ProductCreateRequest; images: FileList }
		>({
			query: ({ body, images }) => {
				const formData = new FormData();
				Array.from(images).forEach((image) => {
					formData.append(`images`, image);
				});
				formData.append('body', JSON.stringify(body));

				return {
					url: `/products`,
					method: 'POST',
					body: formData,
				};
			},
			invalidatesTags: ['Products'],
		}),
		deleteProduct: build.mutation<ProductResponse, string>({
			query: (productArticle) => ({
				url: `/products/${productArticle}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],
		}),
		updateProduct: build.mutation<
			ProductResponse,
			{ productArticle: string; body: ProductCreateRequest }
		>({
			query: ({ productArticle, body }) => ({
				url: `/products/${productArticle}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Products'],
		}),
		// deleteProductImages: build.mutation<
		// 	string[],
		// 	{ productArticle: string; images: string }
		// >({
		// 	query: ({ productArticle, images }) => ({
		// 		url: `/products/images/${productArticle}/${images}`,
		// 		method: 'DELETE',
		// 	}),
		// }),
		// addProductImages: build.mutation<
		// 	string[],
		// 	{ productArticle: string; images: FileList }
		// >({
		// 	query: ({ productArticle, images }) => {
		// 		const formData = new FormData();
		// 		Array.from(images).forEach((image) => {
		// 			formData.append(`images`, image);
		// 		});

		// 		return {
		// 			url: `/products/images/${productArticle}`,
		// 			method: 'POST',
		// 			body: formData,
		// 		};
		// 	},
		// }),
	}),
});

// export const deleteProductImages =
// 	productsApi.endpoints.deleteProductImages.initiate;

// export const addProductImages = productsApi.endpoints.addProductImages.initiate;

export const updateProduct = productsApi.endpoints.updateProduct.initiate;
export const addProduct = productsApi.endpoints.addProduct.initiate;
export const getProducts = productsApi.endpoints.getProducts.initiate;
export const deleteProduct = productsApi.endpoints.deleteProduct.initiate;

export const {
	useGetProductQuery,
	useGetProductsQuery,
	useAddProductMutation,
} = productsApi;

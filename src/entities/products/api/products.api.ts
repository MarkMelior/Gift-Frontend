import { rtkApi } from '@/shared/api/rtkApi';
import {
	ProductCreateRequest,
	ProductFindRequest,
	ProductResponse,
} from '@melior-gift/zod-contracts';

export const productsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<ProductResponse[], ProductFindRequest>({
			query: (dto) => ({
				url: '/products',
				method: 'GET',
				params: dto,
			}),
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
		}),
		deleteProduct: build.mutation<ProductResponse, string>({
			query: (productArticle) => ({
				url: `/products/${productArticle}`,
				method: 'DELETE',
			}),
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

export const updateProduct = productsApi.endpoints.addProduct.initiate;
export const addProduct = productsApi.endpoints.addProduct.initiate;
export const getProducts = productsApi.endpoints.getProducts.initiate;
export const deleteProduct = productsApi.endpoints.deleteProduct.initiate;

export const {
	useGetProductQuery,
	useGetProductsQuery,
	useAddProductMutation,
} = productsApi;

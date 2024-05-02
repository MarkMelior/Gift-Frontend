import { rtkApi } from '@/shared/api/rtkApi';
import {
	ProductCreateRequest,
	ProductFindRequest,
	ProductPricesResponse,
	ProductResponse,
} from '@melior-gift/zod-contracts';

export const productsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<ProductResponse[], ProductFindRequest>({
			query: (dto) => ({
				url: '/products/find',
				method: 'GET',
				params: dto,
			}),
		}),
		getProductsPrice: build.query<ProductPricesResponse, void>({
			query: () => ({
				url: `products/prices`,
				method: 'GET',
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

export const addProduct = productsApi.endpoints.addProduct.initiate;

export const {
	useGetProductQuery,
	useGetProductsPriceQuery,
	useGetProductsQuery,
	useAddProductMutation,
} = productsApi;

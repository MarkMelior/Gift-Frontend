import { rtkApi } from '@/shared/api/rtkApi';
import { ProductCardResponse } from '@melior-gift/zod-contracts';

export const productsHistoryApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProductsHistory: build.query<ProductCardResponse[], void>({
			query: () => ({
				url: '/products-history',
				method: 'GET',
			}),
		}),
		addProductsHistory: build.mutation<void, string[]>({
			query: (articles) => ({
				url: `/products-history`,
				method: 'POST',
				body: articles,
			}),
		}),
	}),
});

export const addProductsHistory =
	productsHistoryApi.endpoints.addProductsHistory.initiate;

export const { useGetProductsHistoryQuery } = productsHistoryApi;

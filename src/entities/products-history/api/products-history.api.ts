import { rtkApi } from '@/shared/api/rtkApi';
import { ProductResponse } from '@melior-gift/zod-contracts';

export const productsHistoryApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProductsHistory: build.query<ProductResponse[], void>({
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

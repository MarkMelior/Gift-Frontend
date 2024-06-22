import { rtkApi } from '@/shared/api/rtkApi';
import { ProductResponse } from '@melior-gift/zod-contracts';

export const favoritesApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getFavoritesProducts: build.query<ProductResponse[], void>({
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
	favoritesApi.endpoints.toggleFavoritesProduct.initiate;

export const { useGetFavoritesProductsQuery } = favoritesApi;

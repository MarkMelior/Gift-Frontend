import { rtkApi } from '@/shared/api/rtkApi';
import { ProductCardResponse } from '@melior-gift/zod-contracts';

export const favoritesApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getFavoritesProducts: build.query<ProductCardResponse[], void>({
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

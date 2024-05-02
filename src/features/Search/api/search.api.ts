import { rtkApi } from '@/shared/api/rtkApi';
import { ProductCardResponse } from '@melior-gift/zod-contracts';

export const searchApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getSearchedProducts: build.query<ProductCardResponse[], string>({
			query: (search) => ({
				url: `/products/search/${search}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetSearchedProductsQuery } = searchApi;

import { ProductCard } from '@/entities/products';
import { rtkApi } from '@/shared/api/rtkApi';

export const searchApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getSearchedProducts: build.query<ProductCard[], string>({
			query: (search) => ({
				url: `/products/search/${search}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetSearchedProductsQuery } = searchApi;

import { FilterSortProps, SortSorting } from '@/features/sorts';
import { ProductCard } from './product.type';

export interface ProductsState {
	data?: ProductCard[];
	isLoading: boolean;
	error?: string;
}

export interface FindProductsDto {
	limit: number;
	sort?: SortSorting;
	filters?: FilterSortProps[];
	maxPrice?: number;
	minPrice?: number;
}

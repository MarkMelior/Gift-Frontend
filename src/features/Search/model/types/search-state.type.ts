import { Product } from '@/entities/products';

export interface SearchState {
	query: string;
	data: Product[];
	isLoading: boolean;
	error?: string;
}

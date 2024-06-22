import {
	SortAge,
	SortCategory,
	SortSex,
	SortSorting,
} from '@melior-gift/zod-contracts';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { initialState } from '../slice/sort.slice';
import { SortState } from '../types/sort.type';

export const getSortSearchParams = (
	searchParams: ReadonlyURLSearchParams | URLSearchParams,
): SortState => {
	const category =
		(searchParams.get('category')?.split('-') as SortCategory[]) ??
		initialState.category;
	const sex = (searchParams.get('sex') as SortSex) ?? initialState.sex;
	const minPrice: number = searchParams.get('min')
		? Number(searchParams.get('min'))
		: initialState.minPrice;
	const maxPrice: number = searchParams.get('max')
		? Number(searchParams.get('max'))
		: initialState.maxPrice;
	const age = (searchParams.get('age') as SortAge) ?? initialState.age;
	const sorting =
		(searchParams.get('sorting') as SortSorting) ?? initialState.sorting;

	return {
		category,
		sex,
		minPrice,
		maxPrice,
		age,
		sorting,
	};
};

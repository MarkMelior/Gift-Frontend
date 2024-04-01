import { useSearchParams } from 'next/navigation';
import { initialState } from '../slice/sortSlice';
import {
	SortAge,
	SortCategory,
	SortSex,
	SortSorting,
	SortState,
} from '../types/sortType';

export const getSortSearchparams = (hook: boolean = true): SortState => {
	// TODO: FIX THIS TROUBLE
	let searchParams;
	if (hook) {
		searchParams = useSearchParams();
	} else {
		searchParams = new URLSearchParams(location.search);
	}

	const category =
		(searchParams.get('category')?.split('-') as SortCategory[]) ??
		initialState.category;
	const sex =
		(searchParams.get('sex')?.split('-') as SortSex[]) ?? initialState.sex;
	const minPrice: number = searchParams.get('min')
		? Number(searchParams.get('min'))
		: initialState.minPrice;
	const maxPrice: number = searchParams.get('max')
		? Number(searchParams.get('max'))
		: initialState.maxPrice;
	const age =
		(searchParams.get('age')?.split('-') as SortAge[]) ?? initialState.age;
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

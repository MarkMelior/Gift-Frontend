import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { sortInitialState } from '../slice/sortSlice';
import {
	SortAge,
	SortCategory,
	SortSex,
	SortSorting,
	SortState,
} from '../types/sortType';

export const getSortSearchparams = (): SortState => {
	const searchParams = useSearchParams();

	return useMemo(() => {
		const category =
			(searchParams.get('category')?.split('-') as SortCategory[]) ??
			sortInitialState.category;
		const sex =
			(searchParams.get('sex')?.split('-') as SortSex[]) ??
			sortInitialState.sex;
		const minPrice: number = searchParams.get('min')
			? Number(searchParams.get('min'))
			: sortInitialState.minPrice;
		const maxPrice: number = searchParams.get('max')
			? Number(searchParams.get('max'))
			: sortInitialState.maxPrice;
		const age =
			(searchParams.get('age')?.split('-') as SortAge[]) ??
			sortInitialState.age;
		const sorting =
			(searchParams.get('sorting') as SortSorting) ?? sortInitialState.sorting;

		return {
			category,
			sex,
			minPrice,
			maxPrice,
			age,
			sorting,
		};
	}, [searchParams]);
};

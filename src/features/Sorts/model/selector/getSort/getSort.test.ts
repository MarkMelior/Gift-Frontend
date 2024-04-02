import { RootState } from '@/app/providers/StoreProvider';
import { initialState as sortInitialState } from '../../slice/sortSlice';
import { SortState } from '../../types/sortType';
import { getSort } from './getSort';

describe('getSort.test', () => {
	test('should return initial state', () => {
		const initialState: SortState = {
			category: ['joke'],
			sex: ['male'],
			age: ['adult'],
			sorting: 'popular',
			minPrice: 0,
			maxPrice: 14000,
		};

		const state: Partial<RootState> = {
			sort: initialState,
		};

		expect(getSort(state as RootState)).toEqual(initialState);
	});

	test('should work with empty state', () => {
		const state: Partial<RootState> = {};

		expect(getSort(state as RootState)).toEqual(sortInitialState);
	});
});

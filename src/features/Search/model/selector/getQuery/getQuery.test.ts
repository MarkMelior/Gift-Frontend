import { RootState } from '@/app/providers/StoreProvider';
import { searchInitialState } from '../../slice/searchSlice';
import { SearchState } from '../../types/SearchState';
import { getQuery } from './getQuery';

describe('getQuery.test', () => {
	test('should return initial state', () => {
		const initialState: SearchState = {
			query: 'gift',
		};

		const state: Partial<RootState> = {
			search: initialState,
		};

		expect(getQuery(state as RootState)).toEqual(initialState);
	});

	test('should work with empty state', () => {
		const state: Partial<RootState> = {};

		expect(getQuery(state as RootState)).toEqual(searchInitialState.query);
	});
});

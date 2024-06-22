import { buildSlice } from '@/shared/lib/store';
import {
	SortAge,
	SortCategory,
	SortSex,
	SortSorting,
} from '@melior-gift/zod-contracts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SortState } from '../types/sort.type';

export const initialState: SortState = {
	category: ['birthday'],
	sex: 'male',
	age: 'adult',
	sorting: 'popular',
	minPrice: 0,
	maxPrice: 20000,
};

const toggleMultiple = (state: string[], action: string) => {
	const index = state.indexOf(action);
	if (index === -1) {
		state.push(action);
	} else if (state.length === 1) {
		return;
	} else {
		state.splice(index, 1);
	}
};

export const sortSlice = buildSlice({
	name: 'sort',
	initialState,
	reducers: {
		toggleCategory: (state, action: PayloadAction<SortCategory>) => {
			toggleMultiple(state.category, action.payload);
		},
		toggleSex: (state, action: PayloadAction<SortSex>) => {
			state.sex = action.payload;
		},
		toggleAge: (state, action: PayloadAction<SortAge>) => {
			state.age = action.payload;
		},
		toggleSorting: (state, action: PayloadAction<SortSorting>) => {
			state.sorting = action.payload;
		},
		setMinPrice: (state, action: PayloadAction<number>) => {
			state.minPrice = action.payload;
		},
		setMaxPrice: (state, action: PayloadAction<number>) => {
			state.maxPrice = action.payload;
		},
		setSortState: (state, action: PayloadAction<SortState>) => {
			Object.assign(state, action.payload);
		},
	},
});

export const {
	actions: sortActions,
	reducer: sortReducer,
	useActions: useSortActions,
} = sortSlice;

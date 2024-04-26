import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getSortSearchParams } from '../features/getSortSearchParams';
import {
	SortAge,
	SortCategory,
	SortSex,
	SortSorting,
	SortState,
} from '../types/sort.type';

export const initialState: SortState = {
	category: ['joke'],
	sex: ['male'],
	age: ['adult'],
	sorting: 'popular',
	minPrice: 100,
	maxPrice: 20000,
};

const sortInitialState = (): SortState => {
	const searchParams = new URLSearchParams(location.search);

	const { age, category, sex, minPrice, maxPrice, sorting } =
		getSortSearchParams(searchParams);

	return {
		category,
		sex,
		age,
		sorting,
		minPrice,
		maxPrice,
	};
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

export const sortSlice = createSlice({
	name: 'sort',
	initialState: sortInitialState,
	reducers: {
		toggleCategory: (state, action: PayloadAction<SortCategory>) => {
			toggleMultiple(state.category, action.payload);
		},
		toggleSex: (state, action: PayloadAction<SortSex>) => {
			toggleMultiple(state.sex, action.payload);
		},
		toggleAge: (state, action: PayloadAction<SortAge>) => {
			toggleMultiple(state.age, action.payload);
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
	},
});

export const { actions: sortActions } = sortSlice;
export const { reducer: sortReducer } = sortSlice;

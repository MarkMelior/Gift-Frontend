import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { maxPrice, minPrice } from '../../ui/sorts';
import { getSortSearchparams } from '../features/getSortSearchparams';
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
	minPrice,
	maxPrice,
};

const sortInitialState = (): SortState => {
	const { age, category, sex, minPrice, maxPrice, sorting } =
		getSortSearchparams(false);

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

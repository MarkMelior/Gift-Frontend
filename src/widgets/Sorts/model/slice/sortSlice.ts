import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	SortAge,
	SortCategory,
	SortSex,
	SortSorting,
	SortState,
} from '../types/sortType';

export const initialState: SortState = {
	category: ['joke'],
	sex: ['male', 'female'],
	age: ['adult'],
	sorting: 'popular',
	minPrice: 0,
	maxPrice: 15000,
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
	initialState,
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

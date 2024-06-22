import {
	CreateSliceOptions,
	SliceCaseReducers,
	SliceSelectors,
	bindActionCreators,
	createSlice,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks';

export const buildSlice = <
	State,
	CaseReducers extends SliceCaseReducers<State>,
	Name extends string,
	Selectors extends SliceSelectors<State>,
	ReducerPath extends string = Name,
>(
	options: CreateSliceOptions<
		State,
		CaseReducers,
		Name,
		ReducerPath,
		Selectors
	>,
) => {
	const slice = createSlice(options);

	const useActions = () => {
		const dispatch = useAppDispatch();

		return useMemo(
			() => bindActionCreators(slice.actions, dispatch),
			[dispatch],
		);
	};

	return {
		...slice,
		useActions,
	};
};

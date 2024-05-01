import { getSort } from './model/selectors/getSort';
import { sortActions, sortReducer } from './model/slice/sort.slice';
import {
	SortCategory,
	SortFilterProps,
	SortSex,
	SortSorting,
	SortState,
} from './model/types/sort.type';
import { Sorts } from './ui/sorts';

export { Sorts, getSort, sortActions, sortReducer };
export type {
	SortFilterProps as FilterSortProps,
	SortCategory,
	SortSex,
	SortSorting,
	SortState,
};

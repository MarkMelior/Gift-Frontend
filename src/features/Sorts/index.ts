import { getSort } from './model/selectors/getSort';
import { sortActions, sortReducer } from './model/slice/sort.slice';
import {
	FilterSortProps,
	SortCategory,
	SortSex,
	SortSorting,
	SortState,
} from './model/types/sort.type';
import { Sorts } from './ui/sorts';

export { Sorts, getSort, sortActions, sortReducer };
export type { FilterSortProps, SortCategory, SortSex, SortSorting, SortState };

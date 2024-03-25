export type SortCategory = 'birthday' | 'love' | 'year' | 'joke';

export type SortSex = 'male' | 'female';

export type SortAge = 'kid' | 'adult' | 'old';

export type SortSorting =
	| 'popular'
	| 'rating'
	| 'creativity'
	| 'expensive'
	| 'cheap'
	| 'new';

// export interface SortState {
// 	category: SortCategory[];
// 	sex: SortSex[];
// 	age: SortAge[];
// 	minPrice: number;
// 	maxPrice: number;
// 	sorting: SortSorting;
// }

export interface SortButtonsProps {
	category: SortCategory[];
	sex: SortSex[];
	age: SortAge[];
	sorting: SortSorting;
}

export type SortButtonsKeys = keyof SortButtonsProps;

export interface SortState extends SortButtonsProps {
	minPrice: number;
	maxPrice: number;
}

export type SortStateKeys = keyof SortState;

export type FilterSortProps = SortCategory | SortSex | SortAge | SortSorting;

export interface ButtonProps {
	text: string;
	color: string;
	key: FilterSortProps;
}

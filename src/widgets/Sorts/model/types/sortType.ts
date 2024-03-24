export type SortCategory = 'birthday' | 'love' | 'new-year' | 'joke';

export type SortSex = 'male' | 'female';

export type SortAge = 'kid' | 'adult' | 'old';

export type SortSorting =
	| 'popular'
	| 'rating'
	| 'creativity'
	| 'expensive'
	| 'cheap'
	| 'new';

export interface SortState {
	category: SortCategory[];
	sex: SortSex[];
	age: SortAge[];
	minPrice: number;
	maxPrice: number;
	sorting: SortSorting;
}

export type SortStateKeys = keyof SortState;

export interface ButtonProps {
	text: string;
	color: string;
	key: SortAge | SortCategory | SortSex | SortSorting;
}

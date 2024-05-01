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

export interface SortState {
	category: SortCategory[];
	sex: SortSex;
	age: SortAge;
	sorting: SortSorting;
	minPrice: number;
	maxPrice: number;
}

export type SortStateKeys = keyof SortState;

export type SortButtonsKeys = Exclude<keyof SortState, 'minPrice' | 'maxPrice'>;

export type SortFilterProps = SortCategory | SortSex | SortAge | SortSorting;

export interface SortButtonProps {
	text: string;
	color: string;
	key: SortFilterProps;
}

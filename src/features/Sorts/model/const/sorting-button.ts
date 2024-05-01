import { SortButtonProps, SortSorting } from '../types/sort.type';

interface ButtonSortingProps extends SortButtonProps {
	key: SortSorting;
}

export const sortingButton: ButtonSortingProps[] = [
	{
		text: 'Популярные',
		color: '66, 153, 255',
		key: 'popular',
	},
	{
		text: 'Высокий рейтинг',
		color: '66, 153, 255',
		key: 'rating',
	},
	{
		text: 'Креативные',
		color: '66, 153, 255',
		key: 'creativity',
	},
	{
		text: 'Дорогие',
		color: '66, 153, 255',
		key: 'expensive',
	},
	{
		text: 'Дешёвые',
		color: '66, 153, 255',
		key: 'cheap',
	},
	{
		text: 'Новые',
		color: '66, 153, 255',
		key: 'new',
	},
];

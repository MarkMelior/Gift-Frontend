import { SortCategory } from '@melior-gift/zod-contracts';
import { SortButtonProps } from '../types/sort.type';

interface ButtonCategoryProps extends SortButtonProps {
	key: SortCategory;
}

export const categoryButton: ButtonCategoryProps[] = [
	{
		text: '🎉 День рождения',
		color: '255, 202, 66',
		key: 'birthday',
	},
	{
		text: '💗️️️ Влюблённым',
		color: '255, 66, 157',
		key: 'love',
	},
	{
		text: '🎄 Новый год',
		color: '66, 255, 153',
		key: 'year',
	},
	{
		text: '😁 Приколы',
		color: '255, 202, 66',
		key: 'joke',
	},
];

import { SortAge } from '@melior-gift/zod-contracts';
import { SortButtonProps } from '../types/sort.type';

interface ButtonAgeProps extends SortButtonProps {
	key: SortAge;
}

export const ageButton: ButtonAgeProps[] = [
	{
		text: 'Дитя',
		color: '66, 153, 255',
		key: 'kid',
	},
	{
		text: 'Молодой',
		color: '66, 153, 255',
		key: 'adult',
	},
	{
		text: 'Старик',
		color: '66, 153, 255',
		key: 'old',
	},
];

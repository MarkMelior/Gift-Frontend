import { SortAge } from '@melior-gift/zod-contracts';
import { SortButtonProps } from '../types/sort.type';

interface ButtonAgeProps extends SortButtonProps {
	key: SortAge;
}

export const ageButton: ButtonAgeProps[] = [
	{
		text: 'Детишки',
		color: '66, 153, 255',
		key: 'kid',
	},
	{
		text: 'Молодой',
		color: '66, 153, 255',
		key: 'adult',
	},
	{
		text: 'В возрасте',
		color: '66, 153, 255',
		key: 'old',
	},
];

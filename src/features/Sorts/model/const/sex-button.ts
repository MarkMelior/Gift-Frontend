import { SortSex } from '@melior-gift/zod-contracts';
import { SortButtonProps } from '../types/sort.type';

interface ButtonSexProps extends SortButtonProps {
	key: SortSex;
}

export const sexButton: ButtonSexProps[] = [
	{
		text: '👦 М',
		color: '66, 153, 255',
		key: 'male',
	},
	{
		text: '👩 Ж',
		color: '255, 66, 157',
		key: 'female',
	},
];

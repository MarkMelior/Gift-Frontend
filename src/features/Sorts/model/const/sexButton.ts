import { ButtonProps, SortSex } from '../types/sortType';

interface ButtonSexProps extends ButtonProps {
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

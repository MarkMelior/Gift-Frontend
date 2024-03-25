import { CheckIcon } from '@/shared/assets/icon/Check';
import { Button } from '@/shared/ui/Button';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ageButton } from '../model/const/ageButton';
import { categoryButton } from '../model/const/categoryButton';
import { sexButton } from '../model/const/sexButton';
import { sortingButton } from '../model/const/sortingButton';
import { getSort } from '../model/selector/getSort';
import { sortSlice } from '../model/slice/sortSlice';
import {
	ButtonProps,
	FilterSortProps,
	SortButtonsKeys,
} from '../model/types/sortType';
import cls from './Sorts.module.scss';

export const SortButtons: FC<{ sort: SortButtonsKeys }> = ({ sort }) => {
	const dispatch = useDispatch();
	const sortState = useSelector(getSort);
	let buttons: ButtonProps[] = [];

	const getToggleFunction = () => {
		switch (sort) {
			case 'category':
				buttons = categoryButton;
				return sortSlice.actions.toggleCategory;
			case 'sex':
				buttons = sexButton;
				return sortSlice.actions.toggleSex;
			case 'age':
				buttons = ageButton;
				return sortSlice.actions.toggleAge;
			case 'sorting':
				buttons = sortingButton;
				return sortSlice.actions.toggleSorting;
			default:
				return null;
		}
	};

	const toggle = getToggleFunction();

	if (!toggle) {
		console.error('Unknown sort type');
		return null;
	}

	const isSelected = (key: FilterSortProps) => {
		// @ts-ignore
		return sortState[sort].includes(key);
	};

	return (
		<>
			{buttons.map(({ text, color, key }) => (
				<Button
					key={key}
					hoverColor={color}
					isSelected={isSelected(key)}
					// @ts-ignore
					onClick={() => dispatch(toggle(key))}
					startContent={
						<CheckIcon isSelected={isSelected(key)} className={cls.check} />
					}
				>
					{text}
				</Button>
			))}
		</>
	);
};

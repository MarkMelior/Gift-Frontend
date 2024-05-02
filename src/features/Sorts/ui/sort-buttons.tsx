import { CheckIcon } from '@/shared/assets/icon/Check';
import { Button } from '@/shared/ui/button';
import { SortCategory } from '@melior-gift/zod-contracts';
import { useSearchParams } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ageButton } from '../model/const/age-button';
import { categoryButton } from '../model/const/category-button';
import { sexButton } from '../model/const/sex-button';
import { sortingButton } from '../model/const/sorting-button';
import { getSortSearchParams } from '../model/features/getSortSearchParams';
import { getSort } from '../model/selectors/getSort';
import { sortActions } from '../model/slice/sort.slice';
import {
	SortButtonProps,
	SortButtonsKeys,
	SortFilterProps,
} from '../model/types/sort.type';
import cls from './sorts.module.scss';

export const SortButtons: FC<{ sort: SortButtonsKeys }> = ({ sort }) => {
	const dispatch = useDispatch();
	const sortState = useSelector(getSort);

	const searchParams = useSearchParams();
	const sortSearchParams = getSortSearchParams(searchParams);

	const { buttons, toggleAction } = useMemo(() => {
		let buttons: SortButtonProps[] = [];
		let toggleAction: any = null;

		switch (sort) {
			case 'category':
				buttons = categoryButton;
				toggleAction = sortActions.toggleCategory;
				break;
			case 'sex':
				buttons = sexButton;
				toggleAction = sortActions.toggleSex;
				break;
			case 'age':
				buttons = ageButton;
				toggleAction = sortActions.toggleAge;
				break;
			case 'sorting':
				buttons = sortingButton;
				toggleAction = sortActions.toggleSorting;
				break;
			default:
				console.error('Unknown sort type');
				break;
		}

		return { buttons, toggleAction };
	}, [sort]);

	const isSelected = useCallback(
		(key: SortFilterProps) => {
			if (Array.isArray(sortState[sort])) {
				return sortState[sort].includes(key as SortCategory);
			}

			return sortState[sort] === key;
		},
		[sortState, sort],
	);

	const isDiffer = useCallback(
		(key: SortFilterProps, enable: boolean): boolean => {
			const stateIncludesKey = Array.isArray(sortState[sort])
				? sortState[sort].includes(key as SortCategory)
				: sortState[sort] === key;

			const paramsIncludesKey = Array.isArray(sortSearchParams[sort])
				? sortSearchParams[sort].includes(key as SortCategory)
				: sortSearchParams[sort] === key;

			return enable
				? stateIncludesKey && !paramsIncludesKey
				: !stateIncludesKey && paramsIncludesKey;
		},
		[sortState, sort, sortSearchParams],
	);

	return (
		<>
			{buttons.map(({ text, color, key }) => {
				return (
					<Button
						key={text}
						hoverColor={color}
						isSelected={isSelected(key)}
						onClick={() => dispatch(toggleAction(key))}
						startContent={
							<CheckIcon isSelected={isSelected(key)} className={cls.check} />
						}
						endContent={
							<>
								{isDiffer(key, false) && <span className={cls.changed}>-</span>}
								{isDiffer(key, true) && <span className={cls.changed}>+</span>}
							</>
						}
					>
						{text}
					</Button>
				);
			})}
		</>
	);
};

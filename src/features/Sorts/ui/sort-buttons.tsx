import { CheckIcon } from '@/shared/assets/icon/Check';
import { Button } from '@/shared/ui/button';
import { useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ageButton } from '../model/const/age-button';
import { categoryButton } from '../model/const/category-button';
import { sexButton } from '../model/const/sex-button';
import { sortingButton } from '../model/const/sorting-button';
import { getSortSearchParams } from '../model/features/getSortSearchParams';
import { getSort } from '../model/selectors/getSort';
import { sortActions } from '../model/slice/sort.slice';
import {
	ButtonProps,
	FilterSortProps,
	SortButtonsKeys,
} from '../model/types/sort.type';
import cls from './sorts.module.scss';

export const SortButtons: FC<{ sort: SortButtonsKeys }> = ({ sort }) => {
	const dispatch = useDispatch();
	const sortState = useSelector(getSort);

	const searchParams = useSearchParams();
	const sortSearchParams = getSortSearchParams(searchParams);

	const { buttons, toggleAction } = useMemo(() => {
		let buttons: ButtonProps[] = [];
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
		// @ts-ignore
		(key: FilterSortProps) => sortState[sort].includes(key),
		[sortState, sort],
	);

	const isDiffer = useCallback(
		(key: FilterSortProps, enable: boolean): boolean => {
			// @ts-ignore
			const stateIncludesKey = sortState[sort].includes(key);
			// @ts-ignore
			const paramsIncludesKey = sortSearchParams[sort].includes(key);
			return enable
				? stateIncludesKey && !paramsIncludesKey
				: !stateIncludesKey && paramsIncludesKey;
		},
		[sortState, sort, sortSearchParams],
	);

	return (
		<>
			{buttons.map(({ text, color, key }) => (
				<MemoizedButton
					key={key}
					text={text}
					color={color}
					isDiffer={isDiffer}
					keyProp={key}
					isSelected={isSelected(key)}
					onClick={() => dispatch(toggleAction(key))}
				/>
			))}
		</>
	);
};

interface MemoizedButtonProps extends ButtonProps {
	isDiffer: (key: FilterSortProps, enable: boolean) => boolean;
	keyProp: FilterSortProps;
	isSelected: boolean;
	onClick: () => void;
}

const MemoizedButton: FC<MemoizedButtonProps> = memo(
	({ text, color, isSelected, onClick, isDiffer, keyProp }) => (
		<Button
			hoverColor={color}
			isSelected={isSelected}
			onClick={onClick}
			startContent={<CheckIcon isSelected={isSelected} className={cls.check} />}
			endContent={
				<>
					{isDiffer(keyProp, false) && <span className={cls.changed}>-</span>}
					{isDiffer(keyProp, true) && <span className={cls.changed}>+</span>}
				</>
			}
		>
			{text}
		</Button>
	),
);

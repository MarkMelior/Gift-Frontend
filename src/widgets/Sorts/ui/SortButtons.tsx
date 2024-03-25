import { CheckIcon } from '@/shared/assets/icon/Check';
import { Button } from '@/shared/ui/Button';
import { FC, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ageButton } from '../model/const/ageButton';
import { categoryButton } from '../model/const/categoryButton';
import { sexButton } from '../model/const/sexButton';
import { sortingButton } from '../model/const/sortingButton';
import { getSortSearchparams } from '../model/features/getSortSearchparams';
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

	const { buttons, toggleAction } = useMemo(() => {
		let buttons: ButtonProps[] = [];
		let toggleAction: any = null;

		switch (sort) {
			case 'category':
				buttons = categoryButton;
				toggleAction = sortSlice.actions.toggleCategory;
				break;
			case 'sex':
				buttons = sexButton;
				toggleAction = sortSlice.actions.toggleSex;
				break;
			case 'age':
				buttons = ageButton;
				toggleAction = sortSlice.actions.toggleAge;
				break;
			case 'sorting':
				buttons = sortingButton;
				toggleAction = sortSlice.actions.toggleSorting;
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

	const isChange = useCallback(
		(key: FilterSortProps, enable: boolean): boolean => {
			const searchParams = getSortSearchparams();
			// @ts-ignore
			const stateIncludesKey = sortState[sort].includes(key);
			// @ts-ignore
			const paramsIncludesKey = searchParams[sort].includes(key);
			return enable
				? stateIncludesKey && !paramsIncludesKey
				: !stateIncludesKey && paramsIncludesKey;
		},
		[sortState, sort],
	);

	return (
		<>
			{buttons.map(({ text, color, key }) => (
				<MemoizedButton
					key={key}
					text={text}
					color={color}
					isChange={isChange}
					keyProp={key}
					isSelected={isSelected(key)}
					onClick={() => dispatch(toggleAction(key))}
				/>
			))}
		</>
	);
};

interface MemoizedButtonProps extends ButtonProps {
	isChange: (key: FilterSortProps, enable: boolean) => boolean;
	keyProp: FilterSortProps;
	isSelected: boolean;
	onClick: () => void;
}

const MemoizedButton: FC<MemoizedButtonProps> = memo(
	({ text, color, isSelected, onClick, isChange, keyProp }) => (
		<Button
			hoverColor={color}
			isSelected={isSelected}
			onClick={onClick}
			startContent={<CheckIcon isSelected={isSelected} className={cls.check} />}
			endContent={
				<>
					{isChange(keyProp, false) && <span className={cls.changed}>-</span>}
					{isChange(keyProp, true) && <span className={cls.changed}>+</span>}
				</>
			}
		>
			{text}
		</Button>
	),
);

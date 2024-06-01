'use client';

import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/input';
import { Button, Slider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getSort } from '../model/selectors/getSort';
import { initialState, sortActions } from '../model/slice/sort.slice';
import { SortButtons } from './sort-buttons';
import cls from './sorts.module.scss';

interface SortsProps {
	onFetch: () => void;
}

// const initialReducers: ReducersList = {
// 	sort: sortReducer,
// };

export const Sorts: FC<SortsProps> = ({ onFetch }) => {
	const dispatch = useAppDispatch();
	const sort = useSelector(getSort);
	const { minPrice, maxPrice } = initialState;

	const setMinPrice = useCallback(
		(value: number) => {
			dispatch(sortActions.setMinPrice(value));
		},
		[dispatch],
	);
	const setMaxPrice = useCallback(
		(value: number) => {
			dispatch(sortActions.setMaxPrice(value));
		},
		[dispatch],
	);

	const router = useRouter();

	const applyFilters = useCallback(() => {
		const { category, sex, minPrice, maxPrice, age, sorting } = sort;

		const query = queryString.stringify({
			category: category.join('-'),
			sex,
			min: minPrice,
			max: maxPrice,
			age,
			sorting,
		});

		router.replace(`?${query}`, { scroll: false });

		onFetch();
	}, [sort, router, onFetch]);

	return (
		// <DynamicModuleLoader reducers={initialReducers}>
		<div className={cls.wrapper}>
			<Button
				onClick={applyFilters}
				// starlight
				// customVariant='layer'
				color='primary'
				className='py-4 !w-full'
			>
				Применить фильтры
			</Button>
			<div className={cls.sort}>
				<header>
					<h6>Категория</h6>
				</header>
				<div className={cls.column}>
					<SortButtons sort='category' />
				</div>
			</div>
			<div className={cls.sort}>
				<header>
					<h6>Кому?</h6>
				</header>
				<div className={cls.row}>
					<SortButtons sort='sex' />
				</div>
			</div>
			<div className={cls.sort}>
				<header>
					<h6>Бюджет</h6>
				</header>
				<div className={cls.priceInput}>
					<Input
						type='number'
						placeholder={`от ${minPrice}`}
						value={String(sort.minPrice)}
						onValueChange={(value: string) => setMinPrice(parseInt(value, 10))}
						endContent={
							<div className='pointer-events-none flex items-center'>
								<span className='text-default-400 text-small'>₽</span>
							</div>
						}
					/>
					<Input
						type='number'
						placeholder={`до ${maxPrice}`}
						value={String(sort.maxPrice)}
						onValueChange={(value: string) => setMaxPrice(parseInt(value, 10))}
						endContent={
							<div className='pointer-events-none flex items-center'>
								<span className='text-default-400 text-small'>₽</span>
							</div>
						}
					/>
				</div>
				<Slider
					size='sm'
					minValue={minPrice}
					maxValue={maxPrice}
					step={100}
					value={[sort.minPrice, sort.maxPrice]}
					onChange={(value: number | number[]) => {
						if (typeof value === 'number') {
							setMinPrice(value);
						} else if (Array.isArray(value)) {
							const [start, end] = value;
							setMinPrice(start);
							setMaxPrice(end);
						}
					}}
					className='max-w-md'
				/>
				{/* <div className={cls.column}>
						<Button
							onClick={() => {
								setMinPrice(0);
								setMaxPrice(500);
							}}
						>
							Малый (0 - 500)
						</Button>
						<Button
							onClick={() => {
								setMinPrice(500);
								setMaxPrice(3000);
							}}
						>
							Средний (500 - 3000)
						</Button>
						<Button
							onClick={() => {
								setMinPrice(minPrice);
								setMaxPrice(maxPrice);
							}}
						>
							Любой
						</Button>
					</div> */}
			</div>
			<div className={cls.sort}>
				<header>
					<h6>Возраст</h6>
				</header>
				<div className={cls.row}>
					<SortButtons sort='age' />
				</div>
			</div>
			<div className={cls.sort}>
				<header>
					<h6>Сортировка</h6>
				</header>
				<div className={cls.column}>
					<SortButtons sort='sorting' />
				</div>
			</div>
		</div>
		// </DynamicModuleLoader>
	);
};

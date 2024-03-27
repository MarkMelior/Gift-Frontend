'use client';

import { productData } from '@/db';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Slider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSort } from '../model/selector/getSort';
import { sortSlice } from '../model/slice/sortSlice';
import { SortButtons } from './SortButtons';
import cls from './Sorts.module.scss';

// export const minPrice = productData
// 	.map((item) => item.markets[0].price)
// 	.reduce((a, b) => {
// 		if (a < b) {
// 			return a;
// 		}
// 		return b;
// 	});
export const minPrice = 0;
export const maxPrice = productData
	.map((item) => item.markets[0].price)
	.reduce((a, b) => {
		if (a > b) {
			return a;
		}
		return b;
	});

export const Sorts: FC = () => {
	const router = useRouter();
	const sort = useSelector(getSort);
	const dispatch = useDispatch();

	const setMinPrice = useCallback(
		(value: number) => {
			dispatch(sortSlice.actions.setMinPrice(value));
		},
		[dispatch],
	);
	const setMaxPrice = useCallback(
		(value: number) => {
			dispatch(sortSlice.actions.setMaxPrice(value));
		},
		[dispatch],
	);

	const applyFilters = useCallback(() => {
		const category = sort.category.join('-');
		const sex = sort.sex.join('-');
		const minPrice = sort.minPrice;
		const maxPrice = sort.maxPrice;
		const age = sort.age.join('-');
		const sorting = sort.sorting;

		router.replace(
			`?category=${category}&sex=${sex}&min=${minPrice}&max=${maxPrice}&age=${age}&sorting=${sorting}`,
			{ scroll: false },
		);
	}, [sort, router]);

	return (
		<div className={cls.wrapper}>
			<Button
				onClick={applyFilters}
				starlight
				customVariant='layer'
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
				<div className={cls.column}>
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
				</div>
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
	);
};

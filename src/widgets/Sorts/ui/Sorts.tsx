'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Slider } from '@nextui-org/react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMaxPrice } from '../model/selector/getMaxPrice';
import { getMinPrice } from '../model/selector/getMinPrice';
import { initialState, sortSlice } from '../model/slice/sortSlice';
import { SortButtons } from './SortButtons';
import cls from './Sorts.module.scss';

export const Sorts: FC = () => {
	const minPrice = initialState.minPrice;
	const maxPrice = initialState.maxPrice;

	const startPrice = useSelector(getMinPrice);
	const endPrice = useSelector(getMaxPrice);

	const dispatch = useDispatch();

	const setStartPrice = (value: number) => {
		dispatch(sortSlice.actions.setMinPrice(value));
	};
	const setEndPrice = (value: number) => {
		dispatch(sortSlice.actions.setMaxPrice(value));
	};

	return (
		<div className={cls.wrapper}>
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
						value={String(startPrice)}
						onValueChange={(value: string) =>
							setStartPrice(parseInt(value, 10))
						}
						endContent={
							<div className='pointer-events-none flex items-center'>
								<span className='text-default-400 text-small'>₽</span>
							</div>
						}
					/>
					<Input
						type='number'
						placeholder={`до ${maxPrice}`}
						value={String(endPrice)}
						onValueChange={(value: string) => setEndPrice(parseInt(value, 10))}
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
					value={[startPrice, endPrice]}
					onChange={(value: number | number[]) => {
						if (typeof value === 'number') {
							setStartPrice(value);
						} else if (Array.isArray(value)) {
							const [start, end] = value;
							setStartPrice(start);
							setEndPrice(end);
						}
					}}
					className='max-w-md'
				/>
				<div className={cls.column}>
					<Button
						onClick={() => {
							setStartPrice(0);
							setEndPrice(500);
						}}
					>
						Малый (0 - 500)
					</Button>
					<Button
						onClick={() => {
							setStartPrice(500);
							setEndPrice(3000);
						}}
					>
						Средний (500 - 3000)
					</Button>
					<Button
						onClick={() => {
							setStartPrice(minPrice);
							setEndPrice(maxPrice);
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

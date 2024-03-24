'use client';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Slider } from '@nextui-org/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import cls from './Sorts.module.scss';

export const Sorts: FC = () => {
	const minPrice = 0;
	const maxPrice = 5000;

	const [startPrice, setStartPrice] = useState<number>(minPrice);
	const [endPrice, setEndPrice] = useState<number>(maxPrice);

	const searchParams = useSearchParams(); // todo

	return (
		<div className={cls.wrapper}>
			<div className={cls.sort}>
				<header>
					<h6>Категория</h6>
				</header>
				<div className={cls.column}>
					<Link href={'?category=birthday'}>
						<Button hoverColor='255, 202, 66'>🎉 День рождение</Button>
					</Link>
					<Button hoverColor='255, 66, 157'>💗️️️ Влюблённым</Button>
					<Button hoverColor='66, 255, 153'>🎄 Новый год</Button>
					<Button hoverColor='255, 202, 66'>😁 Приколы</Button>
				</div>
			</div>
			<div className={cls.sort}>
				<header>
					<h6>Кому?</h6>
				</header>
				<div className={cls.row}>
					<Button hoverColor='66, 153, 255'>👦 М</Button>
					<Button hoverColor='255, 66, 157'>👩 Ж</Button>
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
					<Button hoverColor='66, 153, 255'>Старик</Button>
					<Button hoverColor='66, 153, 255'>Дитя</Button>
				</div>
			</div>
			<div className={cls.sort}>
				<header>
					<h6>Сортировка</h6>
				</header>
				<div className={cls.column}>
					<Button>Популярные</Button>
					<Button>Высокий рейтинг</Button>
					<Button>Креативные</Button>
					<Button>Дешёвые</Button>
					<Button>Дорогие</Button>
				</div>
			</div>
		</div>
	);
};

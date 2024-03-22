'use client';

/* eslint-disable i18next/no-literal-string */
import { cardData } from '@/db';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import { Cards } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { TopPage } from '@/widgets/TopPage';
import { Image, Slider, Textarea } from '@nextui-org/react';
import cn from 'clsx';
import { FC, useState } from 'react';
import cls from './ShopPage.module.scss';

export const ShopPage: FC = () => {
	// const t = useTranslations('ShopPage');
	const minPrice = 0;
	const maxPrice = 5000;

	const [startPrice, setStartPrice] = useState<number>(minPrice);
	const [endPrice, setEndPrice] = useState<number>(maxPrice);

	return (
		<>
			<TopPage
				compact
				title='Easy Gift'
				description='Каждый подарок может быть искусством'
				note='Лучший выбор в мире'
				imageContent={
					<Image
						src='/images/pages/gift.png'
						alt='image'
						width={371}
						height={419}
						className='noselect'
					/>
				}
			/>
			<div className={cls.navigation}>
				<Blackhole />
				<NavigationPanel />
			</div>
			<div className={cn(cls.wrapper, 'content')}>
				<div className={cls.sortWrapper}>
					<div className={cls.sort}>
						<header>
							<h6>Категория</h6>
						</header>
						<div className={cls.sortColumn}>
							<Button hoverColor='255, 202, 66'>🎉 День рождение</Button>
							<Button hoverColor='255, 66, 157'>💗️️️ Влюблённым</Button>
							<Button hoverColor='66, 255, 153'>🎄 Новый год</Button>
							<Button hoverColor='255, 202, 66'>😁 Приколы</Button>
						</div>
					</div>
					<div className={cls.sort}>
						<header>
							<h6>Кому?</h6>
						</header>
						<div className={cls.sortRow}>
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
								onValueChange={(value: string) =>
									setEndPrice(parseInt(value, 10))
								}
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
						<div className={cls.sortColumn}>
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
						<div className={cls.sortRow}>
							<Button hoverColor='66, 153, 255'>Старик</Button>
							<Button hoverColor='66, 153, 255'>Дитя</Button>
						</div>
					</div>
					<div className={cls.sort}>
						<header>
							<h6>Сортировка</h6>
						</header>
						<div className={cls.sortColumn}>
							<Button>Популярные</Button>
							<Button>Высокий рейтинг</Button>
							<Button>Креативные</Button>
							<Button>Дешёвые</Button>
							<Button>Дорогие</Button>
						</div>
					</div>
				</div>
				<div className={cls.block}>
					<div className={cls.ai}>
						<Textarea
							maxRows={2}
							maxLength={250}
							className={cls.textarea}
							placeholder='Введите текстовый запрос и нейросеть поможет вам подобрать подарок'
						/>
						<Button
							customVariant='layer'
							hoverColor='149, 66, 255'
							starlight
							className='py-3 px-8 rounded-lg text-sm'
							startContent={
								<Image
									src='/images/icons/stars-heading-colored.svg'
									alt='test'
									width={22}
									height={22}
									style={{ minWidth: '22px', height: '22px' }}
									className='noselect'
								/>
							}
						>
							Найти подарок
						</Button>
					</div>
					<Cards data={cardData} />
				</div>
			</div>
		</>
	);
};

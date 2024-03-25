'use client';

import { productData } from '@/db';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import { Cards } from '@/shared/ui/Card';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { Sorts } from '@/widgets/Sorts';
import { getSortSearchparams } from '@/widgets/Sorts/model/features/getSortSearchparams';
import { TopPage } from '@/widgets/TopPage';
import { Image, Textarea } from '@nextui-org/react';
import cn from 'clsx';
import { FC, useMemo } from 'react';
import cls from './ShopPage.module.scss';

export const ShopPage: FC = () => {
	const { age, category, maxPrice, sex, minPrice, sorting } =
		getSortSearchparams();

	/**
	 * Фильтрация продуктов по заданным критериям
	 */
	const filteredProducts = useMemo(() => {
		return productData.filter(({ markets, filter }) => {
			// Проверка соответствия цены критериям
			const meetsPriceCriteria =
				markets[0].price >= minPrice && markets[0].price <= maxPrice;
			// Проверка соответствия категории критериям
			const meetsCategoryCriteria = !category.some((cat) =>
				filter.includes(cat),
			);
			// Проверка соответствия пола критериям
			const meetsSexCriteria = !sex.some((s) => filter.includes(s));
			// Проверка соответствия возраста критериям
			const meetsAgeCriteria = !age.some((a) => filter.includes(a));
			// Возвращаем true, если продукт соответствует всем критериям, иначе false
			return (
				meetsPriceCriteria &&
				meetsCategoryCriteria &&
				meetsSexCriteria &&
				meetsAgeCriteria
			);
		});
	}, [productData, minPrice, maxPrice, category, sex, age]);

	/**
	 * Сортировка отфильтрованных продуктов
	 */
	const sortedProducts = useMemo(() => {
		return filteredProducts.slice().sort((a, b) => {
			if (sorting === 'popular') {
				// Сортировка по популярности (количеству отзывов)
				return b.markets[0].reviewCount - a.markets[0].reviewCount;
			} else if (sorting === 'rating') {
				// Сортировка по рейтингу
				return b.markets[0].rating - a.markets[0].rating;
			} else if (sorting === 'creativity') {
				// Сортировка по креативности
				return b.creativity - a.creativity;
			} else if (sorting === 'expensive') {
				// Сортировка по убыванию цены
				return b.markets[0].price - a.markets[0].price;
			} else if (sorting === 'cheap') {
				// Сортировка по возрастанию цены
				return a.markets[0].price - b.markets[0].price;
			} else if (sorting === 'new') {
				// Сортировка по новизне
				return productData.indexOf(b) - productData.indexOf(a); // Последние в массиве идут первыми
			}
			return 0; // Возвращаем 0, если сортировка не требуется или неизвестен тип сортировки
		});
	}, [filteredProducts, sorting]);

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
				<Sorts />
				<div className={cls.block}>
					<div className={cls.ai}>
						<Textarea
							maxRows={2}
							maxLength={250}
							className={cls.textarea}
							id='textarea'
							aria-label='Текстовое поле ввода для поиска подарка нейросетью'
							placeholder='Введите текстовый запрос и нейросеть поможет вам подобрать подарок'
						/>
						<Button
							aria-labelledby='textarea'
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
					<Cards data={sortedProducts} />
				</div>
			</div>
		</>
	);
};

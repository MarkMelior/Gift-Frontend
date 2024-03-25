'use client';

import { productData } from '@/db';
import { ProductDataProps } from '@/shared/types/product';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import { Cards } from '@/shared/ui/Card';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { Sorts } from '@/widgets/Sorts';
import { getMaxPrice } from '@/widgets/Sorts/model/selector/getMaxPrice';
import { getMinPrice } from '@/widgets/Sorts/model/selector/getMinPrice';
import { getSort } from '@/widgets/Sorts/model/selector/getSort';
import { TopPage } from '@/widgets/TopPage';
import { Image, Textarea } from '@nextui-org/react';
import cn from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import cls from './ShopPage.module.scss';

export const ShopPage: FC = () => {
	const startPrice = useSelector(getMinPrice);
	const endPrice = useSelector(getMaxPrice);
	const sort = useSelector(getSort);

	const filteredProductData = productData.filter(
		(product: ProductDataProps) => {
			const meetsPriceCriteria =
				product.markets[0].price >= startPrice &&
				product.markets[0].price <= endPrice;
			const meetsCategoryCriteria = !sort.category.some((category) =>
				product.filter.includes(category),
			);
			const meetsSexCriteria = !sort.sex.some((category) =>
				product.filter.includes(category),
			);
			const meetsAgeCriteria = !sort.age.some((category) =>
				product.filter.includes(category),
			);

			return (
				meetsPriceCriteria &&
				meetsCategoryCriteria &&
				meetsSexCriteria &&
				meetsAgeCriteria
			);
		},
	);

	const sortedProducts = filteredProductData.slice().sort((a, b) => {
		if (sort.sorting === 'popular') {
			// Сортировка по популярности (reviewCount)
			if (a.markets[0].reviewCount !== b.markets[0].reviewCount) {
				return b.markets[0].reviewCount - a.markets[0].reviewCount;
			}
		} else if (sort.sorting === 'rating') {
			// Сортировка по рейтингу (rating)
			if (a.markets[0].rating !== b.markets[0].rating) {
				return b.markets[0].rating - a.markets[0].rating;
			}
		} else if (sort.sorting === 'creativity') {
			// Сортировка по креативности (creativity)
			if (a.creativity !== b.creativity) {
				return b.creativity - a.creativity;
			}
		} else if (sort.sorting === 'expensive') {
			// Сортировка по цене (expensive)
			if (a.markets[0].price !== b.markets[0].price) {
				return b.markets[0].price - a.markets[0].price; // Сортировка по убыванию
			}
		} else if (sort.sorting === 'cheap') {
			// Сортировка по цене (cheap)
			if (a.markets[0].price !== b.markets[0].price) {
				return a.markets[0].price - b.markets[0].price; // Сортировка по возрастанию
			}
		} else if (sort.sorting === 'new') {
			// Сортировка по новизне
			return filteredProductData.indexOf(b) - filteredProductData.indexOf(a); // Последние в массиве идут первыми
		}
		return 0;
	});

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

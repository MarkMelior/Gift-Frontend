'use client';

import { productData } from '@/db';
import { Cards } from '@/entities/Product';
import { getSortSearchparams } from '@/features/Sorts/model/features/getSortSearchparams';
import { FC, memo, useMemo } from 'react';

interface ShopProductsProps {}

export const ShopProducts: FC<ShopProductsProps> = memo(() => {
	const { age, category, maxPrice, sex, minPrice, sorting } =
		getSortSearchparams();

	// const dispatch = useAppDispatch();
	// const productData = useSelector(getProductData);
	// const isLoading = useSelector(getProductIsLoading);
	// const error = useSelector(getProductError);

	// useEffect(() => {
	// 	dispatch(fetchProductData());
	// }, [dispatch]);

	// if (isLoading) {
	// 	return <div>Загрузка идёт!</div>;
	// }

	// if (error) {
	// 	return <div>Ошибка: {error}</div>;
	// }

	/**
	 * Фильтрация продуктов по заданным критериям
	 */
	const filteredProducts = useMemo(() => {
		return productData.filter(({ markets, filters }) => {
			// Проверка соответствия цены критериям
			const meetsPriceCriteria =
				markets[0].price >= minPrice && markets[0].price <= maxPrice;
			// Проверка соответствия категории критериям
			const meetsCategoryCriteria = !category.some((a) => filters.includes(a));
			// Проверка соответствия пола критериям
			const meetsSexCriteria = !sex.some((s) => filters.includes(s));
			// Проверка соответствия возраста критериям
			const meetsAgeCriteria = !age.some((a) => filters.includes(a));

			return (
				meetsPriceCriteria &&
				meetsCategoryCriteria &&
				meetsSexCriteria &&
				meetsAgeCriteria
			);
		});
	}, [minPrice, maxPrice, category, sex, age]);

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

	return <Cards data={sortedProducts} />;
});

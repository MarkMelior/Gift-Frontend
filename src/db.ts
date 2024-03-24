// ! IS TEMPORARY DATA FOR TESTING
import { ProductDataProps } from '@/shared/types/product';

export const productData: ProductDataProps[] = [
	{
		id: 1,
		images: [
			'100025078688b0.webp',
			'100025078688b1.webp',
			'100025078688b2.webp',
		],
		title: 'Ого! Это я недавно такие наушники купил',
		creativity: 5,
		filter: [],
		characteristics: {
			'Характеристика 1': 'Значение характеристики 1',
		},
		markets: [
			{
				market: 'ozon',
				link: 'https://www.ozon.ru/product/logitech-naushniki-provodnye-s-mikrofonom-3-5-mm-chernyy-1353218032/',
				rating: 4.7,
				reviewCount: 321,
				currency: 'RUB',
				price: 13999,
				oldPrice: 21947,
			},
		],
	},
	{
		id: 2,
		images: ['6665452272.webp', '6665452284.webp'],
		title: 'Невероятный накачанный Максим гигабайт',
		creativity: 5,
		filter: [],
		characteristics: {
			'Характеристика 1': 'Значение характеристики 1',
		},
		markets: [
			{
				market: 'ozon',
				link: 'https://www.ozon.ru/product/protein-syvorotochnyy-primekraft-whey-protein-molochnyy-shokolad-milk-chocolate-banka-900-g-416206246/',
				rating: 4.3,
				reviewCount: 29487,
				currency: 'RUB',
				price: 2193,
				oldPrice: 3267,
			},
		],
	},
	{
		id: 3,
		images: ['600014177060b0.webp'],
		title: 'Шашлык лютейший без шампура понял?',
		creativity: 5,
		filter: [],
		characteristics: {
			'Характеристика 1': 'Значение характеристики 1',
		},
		markets: [
			{
				market: 'yandex',
				link: 'https://www.youtube.com/',
				rating: 5,
				reviewCount: 269,
				currency: 'RUB',
				price: 14000,
				oldPrice: 16948,
			},
		],
	},
];

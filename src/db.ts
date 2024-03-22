import { DataCardProps } from './shared/ui/Card';

export const cardData: DataCardProps[] = [
	{
		id: 1,
		src: '/',
		links: [
			{
				src: 'exampleLink1',
				market: 'ozon',
			},
			{
				src: 'exampleLink2',
				market: 'yandex',
			},
		],
		images: ['cat.png', 'cat.png', 'cat.png'],
		title: 'Example Title 1',
		rating: 4.5,
		reviewCount: 100,
		currency: 'RUB',
		price: 50,
		oldPrice: 60,
	},
	{
		id: 2,
		src: '/',
		links: [
			{
				src: 'exampleLink1',
				market: 'ozon',
			},
			{
				src: 'exampleLink2',
				market: 'yandex',
			},
		],
		images: ['cat.png', 'cat.png', 'cat.png'],
		title: 'Example Title 2',
		rating: 4.5,
		reviewCount: 100,
		currency: 'RUB',
		price: 50,
		oldPrice: 60,
	},
	{
		id: 3,
		src: '/',
		links: [
			{
				src: 'exampleLink1',
				market: 'ozon',
			},
			{
				src: 'exampleLink2',
				market: 'yandex',
			},
		],
		images: ['cat.png', 'cat.png', 'cat.png'],
		title:
			'Example Title Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit',
		rating: 4.5,
		reviewCount: 100,
		currency: 'RUB',
		price: 50,
		oldPrice: 60,
	},
];

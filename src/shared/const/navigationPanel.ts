import { PathnamesKeys } from '../config/i18n/config';

interface NavigationPanelItem {
	to: PathnamesKeys;
	image: string;
	alt: string;
	title: string;
	description: string;
}

interface NavigationPanelLinks {
	[key: string]: NavigationPanelItem;
}

export const NavigationPanelData: NavigationPanelLinks = {
	main: {
		to: '/',
		image: '/images/icons/home.svg',
		alt: 'Иконка главной страницы',
		title: 'Главная',
		description: 'Очень крутой текст',
	},
	game: {
		to: '/game',
		image: '/images/icons/play.svg',
		alt: 'Иконка главной страницы',
		title: 'Играть',
		description: 'Зарабатывай виртуальную валюту на скидки',
	},
	shop: {
		to: '/shop',
		image: '/images/icons/cart.svg',
		alt: 'Иконка главной страницы',
		title: 'Магазин',
		description: 'Перейти на страницу магазина',
	},
};

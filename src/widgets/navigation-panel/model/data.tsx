import { CartIcon } from '@/shared/assets/icon/Cart';
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { HomeIcon } from '@/shared/assets/icon/Home';
import { ReactNode } from 'react';

interface NavigationPanelItem {
	to: string;
	image: ReactNode;
	alt: string;
	title: string;
	description: string;
}

export const NavigationPanelData: NavigationPanelItem[] = [
	{
		to: '/',
		image: <HomeIcon />,
		alt: 'Иконка главной страницы',
		title: 'Главная',
		description: 'Коротко про нас',
	},
	{
		to: '/shop',
		image: <CartIcon />,
		alt: 'Иконка главной страницы',
		title: 'Магазин',
		description: 'Найди лучший подарок!',
	},
	{
		to: '/favorites',
		image: <HeartIcon />,
		alt: 'Иконка главной страницы',
		title: 'Избранное',
		description: 'Твои избранные подарки',
	},
];

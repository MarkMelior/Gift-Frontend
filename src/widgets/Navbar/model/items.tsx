import { CartIcon } from '@/shared/assets/icon/Cart';
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { HomeIcon } from '@/shared/assets/icon/Home';
import { getRouteFavorites, getRouteMain, getRouteShop } from '@/shared/const';
import { ReactNode } from 'react';

interface NavbarItemProps {
	path: string;
	text: string;
	icon: ReactNode;
}

export const NavbarItemsList: NavbarItemProps[] = [
	{
		path: getRouteMain(),
		text: 'Главная',
		icon: <HomeIcon />,
	},
	{
		path: getRouteShop(),
		text: 'Магазин',
		icon: <CartIcon />,
	},
	{
		path: getRouteFavorites(),
		text: 'Избранное',
		icon: <HeartIcon />,
	},
];

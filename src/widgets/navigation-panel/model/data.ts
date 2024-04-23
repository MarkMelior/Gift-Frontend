interface NavigationPanelItem {
	to: string;
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
		description: 'Коротко про нас',
	},
	shop: {
		to: '/shop',
		image: '/images/icons/cart.svg',
		alt: 'Иконка главной страницы',
		title: 'Магазин',
		description: 'Найди свой подарок!',
	},
	favorites: {
		to: '/favorites',
		image: '/images/icons/heart.svg',
		alt: 'Иконка главной страницы',
		title: 'Избранное',
		description: 'Ваши сохранённые товары',
	},
};

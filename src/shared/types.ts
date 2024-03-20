export type Size = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type clsxMods = Record<string, boolean | string | undefined>;

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}

// export enum Market {
// 	OZON = 'Ozon',
// 	YANDEX = 'Yandex Market',
// }

export type MarketType = 'ozon' | 'yandex';

export const Market = {
	ozon: {
		name: 'Ozon',
		color: 'var(--color-ozon-rgb)',
		image: 'ozon.svg',
	},
	yandex: {
		name: 'Yandex Market',
		color: 'var(--color-yandex-rgb)',
		image: 'yandex-market.svg',
	},
};

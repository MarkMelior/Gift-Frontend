import { MarketType } from '@melior-gift/zod-contracts';

interface MarketParams {
	name: string;
	color: string;
	image: string;
}

export const Markets: Record<MarketType, MarketParams> = {
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
	aliexpress: {
		name: 'AliExpress',
		color: 'var(--color-aliexpress-rgb)',
		image: 'aliexpress.png',
	},
	wildberries: {
		name: 'Wildberries',
		color: 'var(--color-wildberries-rgb)',
		image: 'wildberries.png',
	},
	sber: {
		name: 'Sber Market',
		color: 'var(--color-sber-rgb)',
		image: 'sber-market.png',
	},
};

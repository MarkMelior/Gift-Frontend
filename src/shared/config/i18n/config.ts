import { TLocales } from '@/shared/types/localization';
import { Pathnames } from 'next-intl/navigation';

export const locales: TLocales[] = ['ru', 'en'] as const;
export const defaultLocale: TLocales = 'ru';
export const localePrefix = 'never'; // Use the default: `always`

export const pathnames = {
	'/': '/',
	'/shop': {
		ru: '/ru/shop',
		en: '/en/shop',
	},
	'/favorites': {
		ru: '/ru/favorites',
		en: '/en/favorites',
	},
	'/product/[id]': {
		ru: '/ru/product/[id]',
		en: '/en/product/[id]',
	},
} satisfies Pathnames<typeof locales>;

export type PathnamesType = typeof pathnames;
export type PathnamesKeys = keyof PathnamesType;

export type AppPathnames = keyof typeof pathnames;

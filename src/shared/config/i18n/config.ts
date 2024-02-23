import { Pathnames } from 'next-intl/navigation';

export type TLocales = 'ru' | 'en';
export const locales: TLocales[] = ['ru', 'en'] as const;
export const defaultLocale: TLocales = 'ru';
export const localePrefix = 'never'; // Use the default: `always`

export const pathnames = {
	'/': '/',
	'/about': '/about',
	// '/pathnames': {
	// 	en: '/pathnames',
	// 	de: '/pfadnamen',
	// },
} satisfies Pathnames<typeof locales>;

export type PathnamesType = typeof pathnames;
export type PathnamesKeys = keyof PathnamesType;

export type AppPathnames = keyof typeof pathnames;

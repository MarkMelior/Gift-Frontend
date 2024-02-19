import { Pathnames } from 'next-intl/navigation';

export const locales = ['ru', 'en'] as const;
export const defaultLocale = 'ru';
export const localePrefix = 'never'; // Use the default: `always`

export const pathnames = {
	'/': '/',
	// '/pathnames': {
	// 	en: '/pathnames',
	// 	de: '/pfadnamen',
	// },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;

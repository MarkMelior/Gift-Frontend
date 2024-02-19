import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;
export const defaultLocale = 'en';
export const localePrefix = 'always'; // Use the default: `always`

export const pathnames = {
	'/': '/',
	// '/pathnames': {
	// 	en: '/pathnames',
	// 	de: '/pfadnamen',
	// },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const defaultLocale = 'ru';
export const locales = ['ru', 'en'] as const;
export const localePrefix = 'always'; //as-needed

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales, localePrefix });

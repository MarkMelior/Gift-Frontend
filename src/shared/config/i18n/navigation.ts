import { localePrefix, locales, pathnames } from '@/shared/config/i18n/config';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } =
	createLocalizedPathnamesNavigation({
		locales,
		pathnames,
		localePrefix,
	});

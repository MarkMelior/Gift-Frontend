import { defaultLocale, localePrefix, locales } from '@/navigation';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	locales,
	localePrefix,
	defaultLocale,
});

export const config = {
	matcher: ['/', '/(ru|en)/:path*'],
};

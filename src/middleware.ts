import {
	defaultLocale,
	localePrefix,
	locales,
	pathnames,
} from '@/shared/config/i18n/config';
import createMiddleware from 'next-intl/middleware';

const nextIntMiddleware = createMiddleware({
	defaultLocale,
	locales,
	pathnames,
	localePrefix,
});

export default nextIntMiddleware;

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		'/',

		// Set a cookie to remember the previous locale for
		// all requests that have a locale prefix
		'/(ru|en)/:path*',

		// Enable redirects that add missing locales
		// (e.g. `/pathnames` -> `/en/pathnames`)
		'/((?!_next|_vercel|.*\\..*).*)',
	],
};

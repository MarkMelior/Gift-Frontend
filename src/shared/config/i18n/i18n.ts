import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	return {
		messages: (
			await (locale === 'ru'
				? import('public/locales/ru.json')
				: import(`public/locales/${locale}.json`))
		).default,
	};
});

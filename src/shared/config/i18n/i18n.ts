import { TLocales } from '@/shared/types/localization';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	// const baseLocale = new Intl.Locale(locale).baseName;
	if (!locales.includes(locale as TLocales)) notFound();

	return {
		messages: (
			await (locale === 'ru'
				? import('public/locales/ru.json')
				: import(`public/locales/${locale as TLocales}.json`))
		).default,
	};
});

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['ru', 'en'];

export default getRequestConfig(async ({ locale }) => {
	const baseLocale = new Intl.Locale(locale).baseName;
	if (!locales.includes(baseLocale)) notFound();

	return {
		messages: (await import(`public/locales/${baseLocale}/translation.json`))
			.default,
	};
});

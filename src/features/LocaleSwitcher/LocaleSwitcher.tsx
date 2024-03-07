import { locales } from '@/shared/config/i18n/config';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export const LocaleSwitcher = () => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<LocaleSwitcherSelect defaultValue={locale}>
			{locales.map((cur) => (
				<option key={cur} value={cur}>
					{t('Язык', { locale: cur })}
				</option>
			))}
		</LocaleSwitcherSelect>
	);
};

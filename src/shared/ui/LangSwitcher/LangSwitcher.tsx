'use client';

import { Link, usePathname } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function LocaleSwitcher() {
	const t = useTranslations();
	const locale = useLocale();
	const otherLocale = locale === 'en' ? 'ru' : 'en';
	const pathname = usePathname();

	return (
		<Link href={pathname} locale={otherLocale}>
			{t('Язык', { locale: otherLocale })}
		</Link>
	);
}

'use client';

import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface LocaleSwitcherProps {
	children?: ReactNode;
}

export default function LocaleSwitcher({ children }: LocaleSwitcherProps) {
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

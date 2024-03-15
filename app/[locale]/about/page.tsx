import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FC } from 'react';

interface AboutPageProps {
	params: { locale: string };
}

const AboutPage: FC<AboutPageProps> = ({ params: { locale } }) => {
	unstable_setRequestLocale(locale);
	const t = useTranslations('AboutPage');

	return <div>{t('title')}</div>;
};

export default AboutPage;

import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => {
	const t = useTranslations();

	return <div>{t('О нас')}</div>;
};

export default AboutPage;

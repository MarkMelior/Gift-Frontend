import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { classNames as cl } from 'shared/lib/classNames/classNames';
import cls from './AboutPage.module.scss';

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => {
	const t = useTranslations();

	return <div className={cl(cls.AboutPage, {}, [])}>{t('О нас')}</div>;
};

export default AboutPage;

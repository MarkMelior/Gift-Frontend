import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { FC } from 'react';
// import { Navbar } from 'widgets/Navbar';

import { LangSwitcher } from '@/shared/ui/LangSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import cls from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<>
			{/* <Navbar></Navbar> */}
			<div className={cl(cls.HomePage, {}, [])}>{t('Главная страница')}</div>
			<Link href={`${locale}/about`}>{t('О нас')}</Link>
			<ThemeSwitcher />
			<LangSwitcher />
		</>
	);
};

export default HomePage;

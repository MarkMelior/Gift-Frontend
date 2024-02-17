import { FC } from 'react';
import { classNames as cl } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
// import { Navbar } from 'widgets/Navbar';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import cls from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<>
			{/* <Navbar></Navbar> */}
			<div className={cl(cls.HomePage, {}, [])}>{t('Главная страница')}</div>
			<Link href={locale + '/about'}>About</Link>
			<ThemeSwitcher></ThemeSwitcher>
			<LangSwitcher></LangSwitcher>
		</>
	);
};

export default HomePage;

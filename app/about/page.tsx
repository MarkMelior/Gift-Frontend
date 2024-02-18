import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { FC } from 'react';
import cls from './AboutPage.module.scss';

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => {
	return (
		<>
			<Navbar />
			<div className={cl(cls.AboutPage, {}, [])}>О нас</div>
		</>
	);
};

export default AboutPage;

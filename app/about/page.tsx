import { FC } from 'react';
import { classNames as cl } from 'shared/lib/classNames/classNames';
import cls from './AboutPage.module.scss';

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = ({}) => {
	return <div className={cl(cls.AboutPage, {}, [])}>About page</div>;
};

export default AboutPage;

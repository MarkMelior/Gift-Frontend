import Link from 'next/link';
import { FC } from 'react';
import { classNames as cl } from 'shared/lib/classNames/classNames';
import cls from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
	return (
		<>
			<div className={cl(cls.HomePage, {}, [])}>Home page</div>
			<Link href={'/about'}>About</Link>
		</>
	);
};

export default HomePage;

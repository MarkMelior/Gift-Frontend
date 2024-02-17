import Link from 'next/link';
import { FC } from 'react';
import { classNames as cl } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
// import { Navbar } from 'widgets/Navbar';
import cls from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
	return (
		<>
			{/* <Navbar></Navbar> */}
			<div className={cl(cls.HomePage, {}, [])}>Home page</div>
			<Link href={'/about'}>About</Link>
			<ThemeSwitcher></ThemeSwitcher>
		</>
	);
};

export default HomePage;

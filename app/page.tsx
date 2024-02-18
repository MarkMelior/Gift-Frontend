import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Navbar } from '@/widgets/Navbar';
import { FC } from 'react';
import cls from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	return (
		<>
			<Navbar />
			<Button variant='slice' className={cl(cls.HomePage, {}, [])}>
				Click!
			</Button>
		</>
	);
};

export default HomePage;

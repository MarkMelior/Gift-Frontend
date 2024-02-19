import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Navbar } from '@/widgets/Navbar';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import cls from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	const t = useTranslations();

	return (
		<>
			<Navbar />
			<Button variant='slice' className={cl(cls.HomePage, {}, [])}>
				{t('IndexPage.title')}
			</Button>
		</>
	);
};

export default HomePage;

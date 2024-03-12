import { About } from '@/pages/About';
import { Advantages } from '@/pages/Advantages';
import { BestProduct } from '@/pages/BestProduct';
import { Ready } from '@/pages/Ready';
import { ReviewsCarousel } from '@/pages/ReviewsCarousel';
import { TopPage } from '@/pages/TopPage';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	const t = useTranslations('MainPage');

	return (
		<>
			<TopPage
				title={t('title')}
				description={t('description')}
				note={t('note')}
				// compact
			/>
			<NavigationPanel />
			<Advantages />
			<About />
			<BestProduct />
			<ReviewsCarousel />
			<Ready />
		</>
	);
};

export default HomePage;

import { About } from '@/widgets/About';
import { Advantages } from '@/widgets/Advantages';
import { BestProduct } from '@/widgets/BestProduct';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { Ready } from '@/widgets/Ready';
import { ReviewsCarousel } from '@/widgets/ReviewsCarousel';
import { TopPage } from '@/widgets/TopPage';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
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

export default MainPage;

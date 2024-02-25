import { About } from '@/widgets/About';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { TopPage } from '@/widgets/TopPage';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	const t = useTranslations();

	return (
		<>
			<TopPage
				title='Easy Gift'
				description='Каждый подарок может быть искусством'
				note='Лучший выбор в мире'
				// compact
			/>
			<NavigationPanel />
			<About />
		</>
	);
};

export default HomePage;

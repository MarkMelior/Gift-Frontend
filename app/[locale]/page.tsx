import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	const t = useTranslations();

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<Button variant='layer'>{t('IndexPage.title')}</Button>
			{/* <Blackhole /> */}
		</>
	);
};

export default HomePage;

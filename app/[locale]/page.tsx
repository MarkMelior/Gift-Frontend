import { MainPage } from '@/views';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FC } from 'react';

interface IndexPageProps {
	params: { locale: string };
}

const IndexPage: FC<IndexPageProps> = ({ params: { locale } }) => {
	unstable_setRequestLocale(locale);

	return <MainPage />;
};

export default IndexPage;

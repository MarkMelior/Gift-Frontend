import { NotFoundPage } from '@/views';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
	title: 'Melior Gift - Несуществующая страница 404',
};

const NotFound: FC = () => {
	return <NotFoundPage />;
};

export default NotFound;

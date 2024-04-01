import { FavoritesPage } from '@/views';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
	title: 'Melior Gift - Избранные подарки',
};

const Favorites: FC = () => {
	return <FavoritesPage />;
};

export default Favorites;

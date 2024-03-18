import { FavoritesPage } from '@/views/FavoritesPage';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FC } from 'react';

interface FavoritesProps {
	params: { locale: string };
}

const Favorites: FC<FavoritesProps> = ({ params: { locale } }) => {
	unstable_setRequestLocale(locale);

	return <FavoritesPage />;
};

export default Favorites;

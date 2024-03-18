import { ShopPage } from '@/views/ShopPage';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FC } from 'react';

interface ShopProps {
	params: { locale: string };
}

const Shop: FC<ShopProps> = ({ params: { locale } }) => {
	unstable_setRequestLocale(locale);

	return <ShopPage />;
};

export default Shop;

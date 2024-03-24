import { ProductPage } from '@/views';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FC } from 'react';

interface ProductProps {
	params: { locale: string };
}

const Product: FC<ProductProps> = ({ params: { locale } }) => {
	unstable_setRequestLocale(locale);

	return <ProductPage />;
};

export default Product;

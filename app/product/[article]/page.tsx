import { ProductPage } from '@/views';
import { FC } from 'react';

export interface ProductPageProps {
	params: { article: string };
}

const Product: FC<ProductPageProps> = ({ params }) => {
	return <ProductPage params={params} />;
};

export default Product;

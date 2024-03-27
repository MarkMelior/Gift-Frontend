import { ProductPage } from '@/views';
import { FC } from 'react';

export interface ProductPageProps {
	params: { id: string };
}

// export async function generateStaticParams() {
// 	return productData.map((post) => ({
// 		product: post.id,
// 	}));
// }

const Product: FC<ProductPageProps> = ({ params }) => {
	return <ProductPage params={params} />;
};

export default Product;

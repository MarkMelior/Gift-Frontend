/* eslint-disable i18next/no-literal-string */
import cn from 'clsx';
import { FC } from 'react';
import cls from './ProductPage.module.scss';

interface ProductPageProps {}

export const ProductPage: FC<ProductPageProps> = () => {
	return <div className={cn(cls.wrapper, 'content')}>Product</div>;
};

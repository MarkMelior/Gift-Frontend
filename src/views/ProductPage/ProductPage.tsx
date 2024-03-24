import cn from 'clsx';
import { FC } from 'react';
import cls from './ProductPage.module.scss';

export const ProductPage: FC = () => {
	return <div className={cn(cls.wrapper, 'content')}>Product</div>;
};

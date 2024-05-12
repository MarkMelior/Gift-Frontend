'use client';

import { useFavorites } from '@/entities/favorites';
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { Button } from '@/shared/ui/button';
import { ProductResponse } from '@melior-gift/zod-contracts';
import cn from 'clsx';
import { FC, MouseEvent, memo } from 'react';
import cls from './product-options.module.scss';

interface ProductOptionsProps {
	product: ProductResponse;
}

export const ProductOptions: FC<ProductOptionsProps> = memo(({ product }) => {
	const { isFavorites, toggleFavorites } = useFavorites(product);

	return (
		<ul className={cls.wrapper}>
			{product.options &&
				product.options.map((option, index) => (
					<li key={index} className={cls.description}>
						<p className={cls.key}>{option.name}:</p>
						<span />
						<p className={cls.value}>{option.value}</p>
					</li>
				))}
			<li className={cls.panel}>
				<Button
					className={cn(
						{ [cls.liked]: isFavorites },
						cls.button,
						'p-2 rounded-full',
					)}
					hoverColor={
						isFavorites ? '255, 66, 66' : 'var(--color-main-inverted-rgb)'
					}
					data-selected={isFavorites}
					onClick={(e: MouseEvent) => {
						e.preventDefault();
						toggleFavorites(e);
					}}
					startContent={<HeartIcon />}
				>
					{isFavorites ? 'В избранном' : 'В избранное'}
				</Button>
			</li>
		</ul>
	);
});

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
				Object.entries(product.options).map(([key, value]) => (
					<li key={key} className={cls.characteristic}>
						<h3>{key}:</h3>
						<div>
							{Array.isArray(value) ? (
								<div className={cls.chipWrapper}>
									{value.map((item, index) => (
										<Button key={index} className={cls.chip}>
											{item}
										</Button>
									))}
								</div>
							) : (
								<ul>
									{Object.entries(value).map(([subKey, subValue]) => (
										<li key={subKey} className={cls.description}>
											<p>{subKey}</p>
											<span />
											{subValue}
										</li>
									))}
								</ul>
							)}
						</div>
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

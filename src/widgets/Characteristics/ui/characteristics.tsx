'use client';

import { Product, useProducts } from '@/entities/products';
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { Button } from '@/shared/ui/button';
import cn from 'clsx';
import { FC, MouseEvent, memo } from 'react';
import cls from './characteristics.module.scss';

interface CharacteristicsProps {
	product: Product;
}

export const Characteristics: FC<CharacteristicsProps> = memo(({ product }) => {
	const { isFavorites, toggleFavorites } = useProducts(product);

	return (
		<ul className={cls.wrapper}>
			{product.characteristics &&
				Object.entries(product.characteristics).map(([key, value]) => (
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

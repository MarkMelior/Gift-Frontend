'use client';

/* eslint-disable i18next/no-literal-string */
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { numberToCurrency } from '@/shared/lib/numberToCurrency';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';
import cls from './Card.module.scss';

interface CardProps {
	className?: string;
}

export const Card: FC<CardProps> = ({ className = '' }) => {
	const formattedPrice = numberToCurrency(29245);
	const formattedOldPrice = numberToCurrency(58600);
	const [isLiked, setIsLiked] = useState<boolean>(false);

	return (
		<div className={cn(cls.wrapper, className)}>
			<div className={cls.top}>
				<div className={cls.image}>
					<Image
						width={512}
						height={512}
						src='/images/temp/cat.png'
						alt='Card'
						className='noselect'
					/>
				</div>
				<Button>Купить</Button>
			</div>
			<div className={cls.info}></div>
			<span className={cn(cls.heading, 'noselect')}>
				Сквиши антистресс игрушки подарочный набор 2 кота Xiaomi Mi Power Bank 3
				20000 mAh
			</span>
			<div className={cls.bottom}>
				<div className={cn(cls.price, 'noselect')}>
					{formattedPrice}
					<span className={cls.oldPrice}>{formattedOldPrice}</span>
				</div>
				<Button
					className='p-2 rounded-full'
					hoverColor={isLiked ? '200, 0, 0' : 'var(--color-main-inverted-rgb)'}
					data-selected={isLiked}
					clear
					slice
					onClick={() => setIsLiked(!isLiked)}
					isIconOnly
					startContent={<HeartIcon />}
				/>
			</div>
		</div>
	);
};

import { numberToCurrency } from '@/shared/lib/numberToCurrency';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './Card.module.scss';

type Market = 'ozon' | 'yandex' | 'aliexpress' | 'wildberries' | 'sber';

interface CardProps {
	price: number;
	title: string;
	defaultMarket: Market;
	images: string[];

	className?: string;
	rating?: number;
	reviewCount?: number;
	oldPrice?: number;
	hot?: boolean;
}

export const Card: FC<CardProps> = ({
	price,
	title,
	defaultMarket,
	images,

	className = '',
	rating,
	reviewCount,
	oldPrice,
	hot,
}) => {
	const t = useTranslations();

	const formattedPrice = numberToCurrency(price);
	const formattedOldPrice = numberToCurrency(oldPrice);

	return (
		<div className={cn(cls.Card, className)}>
			<img src={images[0]} alt={title} />
			<div className={cls.Title}>{title}</div>
			<div className={cls.Wrapper}>
				<div className={cls.Info}>
					{rating && reviewCount && (
						<>
							<div className={cls.Rating}>
								<Image
									src='/images/icons/star.svg'
									alt='star'
									width={16}
									height={16}
									className='noselect'
								/>
								{rating}
							</div>
							<div className={cls.Review}>
								<Image
									src='/images/icons/comment.svg'
									alt='star'
									width={16}
									height={16}
									className='noselect'
								/>
								{reviewCount}
							</div>
						</>
					)}
					{hot && (
						<div className={cls.Hot}>
							{' '}
							<Image
								src='/images/icons/hot.svg'
								alt='star'
								width={16}
								height={16}
								className='noselect'
							/>
						</div>
					)}
				</div>
				<div className={cls.Price}>
					{oldPrice && (
						<span className={cls.oldPrice}>{formattedOldPrice}</span>
					)}
					{formattedPrice}
				</div>
			</div>
		</div>
	);
};

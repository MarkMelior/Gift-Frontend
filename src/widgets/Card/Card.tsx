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
	const t = useTranslations('Card');

	const formattedPrice = numberToCurrency(price);
	const formattedOldPrice = numberToCurrency(oldPrice);

	return (
		<div className={cn(cls.card, className)}>
			<img src={images[0]} alt={title} />
			<div className={cls.title}>{title}</div>
			<div className={cls.wrapper}>
				<div className={cls.info}>
					{rating && reviewCount && (
						<>
							<div className={cls.rating}>
								<Image
									src='/images/icons/star.svg'
									alt={t('icon-star')}
									width={14}
									height={14}
									className='noselect'
								/>
								{rating}
							</div>
							<div className={cls.review}>
								<Image
									src='/images/icons/comment.svg'
									alt={t('icon-comment')}
									width={14}
									height={14}
									className='noselect'
								/>
								{reviewCount}
							</div>
						</>
					)}
					{hot && (
						<div className={cls.hot}>
							{' '}
							<Image
								src='/images/icons/hot.svg'
								alt={t('icon-hot')}
								width={14}
								height={14}
								className='noselect'
							/>
						</div>
					)}
				</div>
				<div className={cls.price}>
					{oldPrice && (
						<span className={cls.oldPrice}>{formattedOldPrice}</span>
					)}
					{formattedPrice}
				</div>
			</div>
		</div>
	);
};

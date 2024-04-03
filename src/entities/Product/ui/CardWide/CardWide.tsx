import { convertCurrency } from '@/shared/lib/features';
import Image from 'next/image';
import { FC, memo } from 'react';
import { CardProps } from '../Card/Card';
import cls from './CardWide.module.scss';

export const CardWide: FC<CardProps> = memo(({ data }) => {
	const convertedPrice = convertCurrency(data.markets[0].price);
	const convertedOldPrice = convertCurrency(data.markets[0].oldPrice);

	return (
		<div className={cls.card}>
			<img src={`/images/products/${data.images[0]}`} alt={data.title} />
			<div className={cls.title}>{data.title}</div>
			<div className={cls.wrapper}>
				<div className={cls.info}>
					{data.markets[0].rating && data.markets[0].reviewCount && (
						<>
							<div className={cls.rating}>
								<Image
									src='/images/icons/star.svg'
									alt='Иконка звезды'
									width={14}
									height={14}
									className='noselect'
								/>
								{data.markets[0].rating}
							</div>
							<div className={cls.review}>
								<Image
									src='/images/icons/comment.svg'
									alt='Иконка комментария'
									width={14}
									height={14}
									className='noselect'
								/>
								{data.markets[0].reviewCount}
							</div>
						</>
					)}
					<div className={cls.hot}>
						<Image
							src='/images/icons/hot.svg'
							alt='Иконка огонька'
							width={14}
							height={14}
							className='noselect'
						/>
					</div>
				</div>
				<div className={cls.price}>
					{convertedOldPrice && (
						<span className={cls.oldPrice}>{convertedOldPrice}</span>
					)}
					{convertedPrice}
				</div>
			</div>
		</div>
	);
});

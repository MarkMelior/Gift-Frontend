import { productLink } from '@/shared/lib/features';
import { useCurrency } from '@/shared/lib/hooks';
import { ProductResponse } from '@melior-gift/zod-contracts';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import cls from './card-wide.module.scss';

export const CardWide: FC<{ data: ProductResponse }> = ({ data }) => {
	const convertedPrice = useCurrency(data.markets[0].price);
	const convertedOldPrice = useCurrency(data.markets[0].oldPrice);

	return (
		<Link
			href={productLink(data.title, data.article)}
			className={cls.wrapper}
			target='_blank'
		>
			<div className={cls.card}>
				<img
					src={`${process.env.UPLOADS}/products/${data.article}/${data.images[0]}`}
				/>
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
		</Link>
	);
};

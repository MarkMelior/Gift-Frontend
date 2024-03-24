'use client';

import { getFavorites } from '@/app/providers/StoreProvider/model/selector/getFavorites';
import { favoritesSlice } from '@/app/providers/StoreProvider/model/slice/favoritesSlice';
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { StarIcon } from '@/shared/assets/icon/Star';
import { Markets } from '@/shared/const/markets';
import { MediaSize } from '@/shared/const/mediaSize';
import { convertCurrency, productLink } from '@/shared/lib/features';
import { useLocalstorageArray } from '@/shared/lib/hooks';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { ProductDataProps } from '@/shared/types/product';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@nextui-org/react';
import crypto from 'crypto';
import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEvent, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import cls from './Card.module.scss';

export interface CardProps {
	data: ProductDataProps;
}

export const Card: FC<CardProps> = memo(({ data }) => {
	const swiperRef = useRef<SwiperRef>(null);
	const isPhone = useMediaQuery({ maxWidth: MediaSize.MD });
	const saltPagination = crypto.randomBytes(2).toString('hex');

	const handleMouseMove = (e: MouseEvent) => {
		const sliderLength = swiperRef.current?.swiper.slides.length;
		// @ts-ignore
		if (sliderLength > 1) {
			const sliderWidth = swiperRef.current?.swiper.width;
			// @ts-ignore
			const sliderPath = Math.round(sliderWidth / sliderLength);
			const sliderMousePos =
				// @ts-ignore
				e.clientX - swiperRef.current?.getBoundingClientRect().left;
			const sliderSlide = Math.floor(sliderMousePos / sliderPath);
			swiperRef.current?.swiper.slideTo(sliderSlide);
		}
	};

	const pagination = {
		clickable: true,
		el: `[data-slider-dots="${data.id}-${saltPagination}"]`,
		bulletClass: cls.bullet,
		bulletActiveClass: cls.bulletActive,
		renderBullet(_: number, className: string) {
			return `<div class="${className}"></div>`;
		},
	};

	const images = data.images.slice(0, 5);

	const dispatch = useDispatch();

	const { add: addHistory } = useLocalstorageArray<ProductDataProps['id']>(
		LocalstorageKeys.HISTORY,
		data.id,
	);

	const isFavorites = useSelector(getFavorites(data.id));
	const convertedPrice = convertCurrency(data.markets[0].price);
	const convertedOldPrice = convertCurrency(data.markets[0].oldPrice);

	return (
		<Link href={productLink(false, data.id)} className={cls.wrapper}>
			<div className={cls.top}>
				<div className={cls.image} onMouseMove={handleMouseMove}>
					<Swiper
						modules={[Pagination]}
						pagination={data.images.length > 1 ? pagination : false}
						className='h-full'
						key={data.title}
						ref={swiperRef}
						loop={isPhone}
					>
						{images.map((image, index) => (
							<SwiperSlide key={image}>
								<Image
									width={512}
									height={512}
									src={`/images/products/${image}`}
									alt={`Card ${index}`}
									className='noselect'
									loading='lazy'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<Button
					onClick={(e) => {
						e.preventDefault();
						window.open(data.markets[0].link, '_blank');
						addHistory(e);
					}}
				>
					Купить
				</Button>
			</div>
			<div className={cls.infoWrapper}>
				<div className={cls.info}>
					<div className={cls.stats}>
						<StarIcon />
						<span>{data.markets[0].rating}</span>
					</div>
					<div className={cls.stats}>
						<ReviewIcon />
						<span>{data.markets[0].reviewCount}</span>
					</div>
					<Tooltip
						offset={5}
						placement='bottom'
						showArrow
						content={
							<div className='flex items-center gap-2'>
								<Image
									src={`/images/icons/market/${
										Markets[data.markets[0].market].image
									}`}
									width={24}
									height={24}
									alt='test'
								/>
								<span>Статистика с {Markets[data.markets[0].market].name}</span>
							</div>
						}
						className={cls.tooltip}
					>
						<Image
							src={`/images/icons/market/${Markets[data.markets[0].market].image}`}
							width={16}
							height={16}
							alt='test'
						/>
					</Tooltip>
				</div>
				{pagination && (
					<span
						className={cls.bulletWrapper}
						data-slider-dots={`${data.id}-${saltPagination}`}
					/>
				)}
			</div>
			<span className={cls.heading}>{data.title}</span>
			<span className={cls.cashback}>
				кэшбэк ~{convertCurrency((data.markets[0].price / 100) * 5)}
			</span>
			<div className={cls.bottom}>
				<div className={cls.price}>
					{convertedPrice}
					{convertedOldPrice && (
						<span className={cls.oldPrice}>{convertedOldPrice}</span>
					)}
				</div>
				<Button
					className='p-2 rounded-full'
					hoverColor={
						isFavorites ? '255, 66, 66' : 'var(--color-main-inverted-rgb)'
					}
					data-selected={isFavorites}
					clear
					slice
					onClick={(e: MouseEvent) => {
						e.preventDefault();
						dispatch(favoritesSlice.actions.toggle(data.id));
					}}
					isIconOnly
					startContent={<HeartIcon />}
				/>
			</div>
		</Link>
	);
});

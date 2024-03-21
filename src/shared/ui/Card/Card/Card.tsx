'use client';

/* eslint-disable i18next/no-literal-string */
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { StarIcon } from '@/shared/assets/icon/Star';
import { PathnamesKeys } from '@/shared/config/i18n/config';
import { Link } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { numberToCurrency } from '@/shared/lib/numberToCurrency';
import { Market, MarketType } from '@/shared/types';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import { FC, MouseEvent, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import cls from './Card.module.scss';

export interface CardLinksProps {
	src: string;
	market: MarketType;
}

export interface CardProps {
	src: PathnamesKeys;
	links: CardLinksProps;
	images: string[];
	title: string;
	rating: number;
	reviewCount: number;
	price: number;
	oldPrice?: number;
}

export const Card: FC<CardProps> = ({
	src,
	links,
	images,
	title,
	rating = 0,
	reviewCount = 0,
	price,
	oldPrice,
}) => {
	const formattedPrice = numberToCurrency(price);
	const formattedOldPrice = numberToCurrency(oldPrice || price);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const swiperRef = useRef<SwiperRef>(null);
	const isPhone = useMediaQuery({ maxWidth: MediaSize.MD });

	const handleMouseMove = (e: MouseEvent) => {
		const sliderLength = swiperRef.current?.swiper.slides.length;
		// @ts-ignore
		if (sliderLength > 1) {
			const sliderWidth = swiperRef.current?.swiper.width;
			// @ts-ignore
			const sliderPath = Math.round(sliderWidth / sliderLength);
			const sliderMousePos =
				// @ts-ignore
				// eslint-disable-next-line no-unsafe-optional-chaining
				e.clientX - swiperRef.current?.getBoundingClientRect().left;
			const sliderSlide = Math.floor(sliderMousePos / sliderPath);
			swiperRef.current?.swiper.slideTo(sliderSlide);
		}
	};

	let pagination: boolean | object = false;

	if (images.length > 1) {
		pagination = {
			clickable: true,
			el: '[data-slider-dots]',
			bulletClass: cls.bullet,
			bulletActiveClass: cls.bulletActive,
			renderBullet(index: number, className: string) {
				return `<div class="${className}"></div>`;
			},
		};
	}

	return (
		<Link href={src} className={cls.wrapper}>
			<div className={cls.top}>
				<div className={cls.image} onMouseMove={handleMouseMove}>
					<Swiper
						modules={[Pagination]}
						pagination={pagination}
						className='h-full'
						ref={swiperRef}
						loop={isPhone}
					>
						{images.map((image, index) => (
							<SwiperSlide key={image}>
								<Image
									width={512}
									height={512}
									src={`/images/products/${image}`}
									alt='Card'
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
						window.open(links.src, '_blank');
					}}
				>
					Купить
				</Button>
			</div>
			<div className={cls.infoWrapper}>
				<div className={cls.info}>
					<div className={cls.stats}>
						<StarIcon />
						<span>{rating}</span>
					</div>
					<div className={cls.stats}>
						<ReviewIcon />
						<span>{reviewCount}</span>
					</div>
					<Tooltip
						offset={5}
						placement='bottom'
						showArrow
						content={
							<div className='flex items-center gap-2'>
								<Image
									src={`/images/icons/market/${Market[links.market].image}`}
									width={24}
									height={24}
									alt='test'
								/>
								{/* eslint-disable-next-line react/jsx-one-expression-per-line */}
								<span>Статистика с {Market[links.market].name}</span>
							</div>
						}
						className={cls.tooltip}
					>
						{/* <div
							className={cls.indicator}
							style={{ '--indicator-color-rgb': Market[links.market].color }}
						/> */}
						<Image
							src={`/images/icons/market/${Market[links.market].image}`}
							width={16}
							height={16}
							alt='test'
						/>
					</Tooltip>
				</div>
				{pagination && <span className={cls.bulletWrapper} data-slider-dots />}
			</div>
			<span className={cls.heading}>{title}</span>
			<div className={cls.bottom}>
				<div className={cls.price}>
					{formattedPrice}
					{oldPrice && (
						<span className={cls.oldPrice}>{formattedOldPrice}</span>
					)}
				</div>
				<Button
					className='p-2 rounded-full'
					hoverColor={
						isLiked ? '255, 66, 66' : 'var(--color-main-inverted-rgb)'
					}
					data-selected={isLiked}
					clear
					slice
					onClick={(e) => {
						setIsLiked(!isLiked);
						e.preventDefault();
					}}
					isIconOnly
					startContent={<HeartIcon />}
				/>
			</div>
		</Link>
	);
};

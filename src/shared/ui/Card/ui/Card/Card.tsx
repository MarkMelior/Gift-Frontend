'use client';

/* eslint-disable i18next/no-literal-string */
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { StarIcon } from '@/shared/assets/icon/Star';
import { PathnamesKeys } from '@/shared/config/i18n/config';
import { Link } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { addStorageData } from '@/shared/lib/addStorageData';
import { numberToCurrency } from '@/shared/lib/numberToCurrency';
import { Market, MarketType } from '@/shared/types';
import { Button } from '@/shared/ui/Button';
import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import { FC, MouseEvent, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import cls from './Card.module.scss';

export interface CardLinksProps {
	src: string;
	market: MarketType;
}

export interface DataCardProps {
	id: number;
	src: PathnamesKeys;
	links: CardLinksProps[];
	images: string[];
	title: string;
	rating: number;
	reviewCount: number;
	price: number;
	oldPrice?: number;
}

export interface CardProps {
	data: DataCardProps;
}

export const Card: FC<CardProps> = ({ data }) => {
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
				e.clientX - swiperRef.current?.getBoundingClientRect().left;
			const sliderSlide = Math.floor(sliderMousePos / sliderPath);
			swiperRef.current?.swiper.slideTo(sliderSlide);
		}
	};

	const pagination = {
		clickable: true,
		el: `[data-slider-dots="${data.id}"]`,
		bulletClass: cls.bullet,
		bulletActiveClass: cls.bulletActive,
		renderBullet(index: number, className: string) {
			return `<div class="${className}"></div>`;
		},
	};

	const images = data.images.slice(0, 5);

	const { isLiked, toggleLike } = addStorageData(data.id, 'likedProducts');
	const { toggleLike: toggleHistory } = addStorageData(
		data.id,
		'historyProducts',
	);

	return (
		<Link href={data.src} className={cls.wrapper}>
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
						window.open(data.links[0].src, '_blank');
						toggleHistory(e);
					}}
				>
					Купить
				</Button>
			</div>
			<div className={cls.infoWrapper}>
				<div className={cls.info}>
					<div className={cls.stats}>
						<StarIcon />
						<span>{data.rating}</span>
					</div>
					<div className={cls.stats}>
						<ReviewIcon />
						<span>{data.reviewCount}</span>
					</div>
					<Tooltip
						offset={5}
						placement='bottom'
						showArrow
						content={
							<div className='flex items-center gap-2'>
								<Image
									src={`/images/icons/market/${
										Market[data.links[0].market].image
									}`}
									width={24}
									height={24}
									alt='test'
								/>
								<span>Статистика с {Market[data.links[0].market].name}</span>
							</div>
						}
						className={cls.tooltip}
					>
						{/* <div
							className={cls.indicator}
							style={{ '--indicator-color-rgb': Market[links.market].color }}
						/> */}
						<Image
							src={`/images/icons/market/${Market[data.links[0].market].image}`}
							width={16}
							height={16}
							alt='test'
						/>
					</Tooltip>
				</div>
				{pagination && (
					<span className={cls.bulletWrapper} data-slider-dots={data.id} />
				)}
			</div>
			<span className={cls.heading}>{data.title}</span>
			<span className={cls.cashback}>
				кэшбэк ~{numberToCurrency((data.price / 100) * 5)}
			</span>
			<div className={cls.bottom}>
				<div className={cls.price}>
					{numberToCurrency(data.price)}
					{data.oldPrice && (
						<span className={cls.oldPrice}>
							{numberToCurrency(data.oldPrice)}
						</span>
					)}
				</div>
				{/* <CardLike id={data.id} /> */}
				<Button
					className='p-2 rounded-full'
					hoverColor={
						isLiked ? '255, 66, 66' : 'var(--color-main-inverted-rgb)'
					}
					data-selected={isLiked}
					clear
					slice
					onClick={toggleLike}
					isIconOnly
					startContent={<HeartIcon />}
				/>
			</div>
		</Link>
	);
};

'use client';

/* eslint-disable indent */
import { productData } from '@/db';
import { CardWide } from '@/entities/Product';
import { MediaSize } from '@/shared/const';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/widgets/Heading';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FC, memo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './BestProduct.module.scss';

export const BestProduct: FC = memo(() => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const { theme } = useTheme();

	const isSM = useMediaQuery({ maxWidth: MediaSize.SM });
	const isMD = useMediaQuery({ maxWidth: 820 });
	const isLG = useMediaQuery({ maxWidth: 1120 });
	const isXL = useMediaQuery({ maxWidth: MediaSize.XL });
	let slidesPerView: number = 4;

	if (isXL) {
		slidesPerView = 3.5;
	}
	if (isLG) {
		slidesPerView = 2.5;
	}
	if (isMD) {
		slidesPerView = 1.5;
	}
	if (isSM) {
		slidesPerView = 1;
	}

	const cards = [];
	for (let i = 0; i < 4; i++) {
		cards.push(
			<SwiperSlide key={i}>
				<CardWide data={productData[i]} />
			</SwiperSlide>,
		);
	}

	return (
		<section className={cn(cls.wrapper, 'content')}>
			{theme === 'dark' && (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: 'easeIn' }}
					className={`${cls.image} noselect`}
				>
					{/* <Image
						src='/images/pages/glow-best.png'
						width={1624}
						height={862}
						alt='Background glow image'
					/> */}
					<img
						src='/images/pages/deprecated/glow-best-default.png'
						alt='Background glow image'
					/>
				</motion.div>
			)}
			<Heading
				title='Лучшие подарки'
				description='Это забота и внимание, которые приносят радость и оставляют незабываемые впечатления'
				note='Топ из топов'
				doubleTitle={false}
				center
				customSize={3}
			/>
			<div className={cls.wrapperSwiper}>
				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					spaceBetween={30}
					slidesPerView={slidesPerView}
					loop
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					centeredSlides
					pagination={{
						clickable: true,
						el: '[data-slider-dots]',
						type: 'bullets',
						bulletClass: cls.bullet,
						bulletActiveClass: cls.bulletActive,
						renderBullet(index, className) {
							return `<div class="${className}"></div>`;
						},
					}}
					navigation={{
						prevEl: cls.buttonPrev,
						nextEl: cls.buttonNext,
					}}
					onInit={(swiper) => {
						// @ts-ignore
						swiper.params.navigation.prevEl = prevRef.current;
						// @ts-ignore
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
						swiper.navigation.update();
					}}
				>
					{cards}
					<div className={cls.buttonPrev}>
						<Button disableRipple ref={prevRef} />
					</div>
					<div className={cls.buttonNext}>
						<Button disableRipple ref={nextRef} />
					</div>
				</Swiper>
				<div className={cls.bulletContent}>
					<span className={cls.bulletWrapper} data-slider-dots />
				</div>
			</div>
		</section>
	);
});

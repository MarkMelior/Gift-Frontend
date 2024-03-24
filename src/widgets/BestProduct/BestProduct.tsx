'use client';

/* eslint-disable indent */
import { MediaSize } from '@/shared/const/mediaSize';
import { Button } from '@/shared/ui/Button';
import { CardWide } from '@/shared/ui/Card';
import { Heading } from '@/widgets/Heading';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FC, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './BestProduct.module.scss';

export const BestProduct: FC = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const isMobile = useMediaQuery({ maxWidth: MediaSize.SM });
	const { theme } = useTheme();

	const cards = [];
	for (let i = 0; i < 7; i++) {
		cards.push(
			<SwiperSlide key={i}>
				<CardWide
					oldPrice={58600}
					price={29245}
					title={`${i + 1}. Xiaomi Mi Power Bank 3 20000 mAh`}
					defaultMarket='ozon'
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
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
					<Image
						src='/images/pages/glow-best.png'
						width={1624}
						height={862}
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
					slidesPerView={isMobile ? 1 : 4}
					loop
					autoplay={
						isMobile
							? false
							: {
									delay: 2500,
									disableOnInteraction: false,
								}
					}
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
};

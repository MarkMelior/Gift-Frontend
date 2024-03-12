'use client';

import { Button } from '@/shared/ui/Button';
import { Card } from '@/widgets/Card';
import { Heading } from '@/widgets/Heading';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, useRef } from 'react';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './BestProduct.module.scss';

interface BestProductProps {
	className?: string;
}

export const BestProduct: FC<BestProductProps> = ({ className = '' }) => {
	const t = useTranslations('BestProduct');
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	// const bulletWrapperRef = useRef(null);
	// const onAutoplayTimeLeft = (s, time, progress: number) => {
	// 	// @ts-ignore
	// 	bulletWrapperRef.current.style.setProperty(
	// 		'--autoplay-progress',
	// 		`${progress * -100}%`,
	// 	);
	// };

	const cards = [];
	for (let i = 0; i < 7; i++) {
		cards.push(
			<SwiperSlide>
				<Card
					key={i}
					oldPrice={58600}
					price={29245}
					title={`${i + 1}. Xiaomi Mi Power Bank 3 20000 mAh`}
					defaultMarket={'ozon'}
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
			</SwiperSlide>,
		);
	}

	return (
		<section className={cn(className, 'content')}>
			<Image
				src='/images/pages/glow-best.png'
				width={1624}
				height={862}
				alt={t('background-glow-image-alt')}
				className={`${cls.image} noselect`}
			/>
			<Heading
				title={t('title')}
				description={t('description')}
				note={t('note')}
				doubleTitle={false}
				center
				customSize={3}
			></Heading>
			<div className={cls.wrapper}>
				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					spaceBetween={30}
					slidesPerView={4}
					loop
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					centeredSlides
					// onAutoplayTimeLeft={onAutoplayTimeLeft}
					pagination={{
						clickable: true,
						el: '[data-slider-dots]',
						type: 'bullets',
						bulletClass: cls.bullet,
						bulletActiveClass: cls.bulletActive,
						renderBullet: function (index, className) {
							return '<div class="' + className + '"></div>';
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
						<Button ref={prevRef} />
					</div>
					<div className={cls.buttonNext}>
						<Button ref={nextRef} />
					</div>
				</Swiper>
				<div className={cls.bulletContent}>
					<span
						// ref={bulletWrapperRef}
						className={cls.bulletWrapper}
						data-slider-dots
					></span>
				</div>
			</div>
		</section>
	);
};

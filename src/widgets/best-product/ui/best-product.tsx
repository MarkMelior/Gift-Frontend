'use client';

import {
	CardWide,
	CardWideSkeleton,
	useGetProductsQuery,
} from '@/features/products';
import { MediaSize, bestProducts } from '@/shared/const';
import { Button } from '@/shared/ui/button';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { Heading } from '@/widgets/heading';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './best-product.module.scss';

export const BestProduct: FC = () => {
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

	const { data, isLoading } = useGetProductsQuery({
		limit: 10,
		articles: bestProducts,
	});
	const products = data?.products;

	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const renderCard = useCallback(() => {
		if (!products) {
			return Array.from({ length: 6 }, () => (
				<SwiperSlide key={Math.random()}>
					<CardWideSkeleton />
				</SwiperSlide>
			));
		}
		return products.map((product) => (
			<SwiperSlide key={product.article}>
				<CardWide data={product} />
			</SwiperSlide>
		));
	}, [products]);

	return (
		<section className={cn(cls.wrapper, 'content')}>
			{theme === 'dark' && isMounted && (
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
				note='Популярное'
				title='Лучшие подарки'
				description='Не теряйте время на поиски - наши подарки точно угодят и впечатлят даже самых взыскательных.'
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
					centeredSlidesBounds
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
					{renderCard()}
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

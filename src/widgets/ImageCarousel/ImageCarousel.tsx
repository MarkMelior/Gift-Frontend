'use client';

import { ProductDataProps } from '@/shared/types/product';
import { Button } from '@/shared/ui/Button';
import { FC, useRef, useState } from 'react';
import { Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './ImageCarousel.module.scss';

interface ImageCarouselProps {
	product: ProductDataProps;
}

export const ImageCarousel: FC<ImageCarouselProps> = ({ product }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	let images = [];
	for (let i = 0; i < product.images.length; i++) {
		images.push(
			<SwiperSlide key={i}>
				{/* eslint-disable-next-line jsx-a11y/alt-text */}
				<img src={`/images/products/${product.images[i]}`} />
			</SwiperSlide>,
		);
	}

	return (
		<div className={cls.wrapper}>
			<Swiper
				// @ts-ignore
				onSwiper={setThumbsSwiper}
				direction='vertical'
				watchSlidesProgress
				mousewheel
				spaceBetween={10}
				slidesPerView={5.5}
				modules={[Thumbs, Mousewheel]}
				className={cls.thumbs}
			>
				{images ?? 'st'}
			</Swiper>
			<Swiper
				spaceBetween={10}
				slideActiveClass={cls.slideActive}
				loop
				thumbs={{
					// @ts-ignore
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					slideThumbActiveClass: cls.slideThumbActive,
				}}
				modules={[Navigation, Thumbs]}
				className={cls.image}
				navigation={{
					prevEl: cls.buttonPrev,
					nextEl: cls.buttonNext,
				}}
				onInit={(swiper) => {
					if (prevRef.current && nextRef.current) {
						// @ts-ignore
						swiper.params.navigation.prevEl = prevRef.current;
						// @ts-ignore
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
						swiper.navigation.update();
					}
				}}
			>
				{images ?? 'te'}
				<div className={cls.buttonPrev}>
					<Button disableRipple ref={prevRef} />
				</div>
				<div className={cls.buttonNext}>
					<Button disableRipple ref={nextRef} />
				</div>
			</Swiper>
		</div>
	);
};

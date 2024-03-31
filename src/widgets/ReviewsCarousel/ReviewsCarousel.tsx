'use client';

import { getSettingsOptimization } from '@/features/Settings';
import { MediaSize } from '@/shared/const';
import { SlideHeading } from '@/shared/ui/HeadingSlide';
import { StarRating } from '@/shared/ui/StarRating';
import { User } from '@nextui-org/react';
import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './ReviewsCarousel.module.scss';

export const ReviewsCarousel: FC = () => {
	const isSM = useMediaQuery({ maxWidth: MediaSize.SM });
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });
	const isXL = useMediaQuery({ maxWidth: MediaSize.XL });
	const isOptimization = useSelector(getSettingsOptimization);

	let slidesPerView: number = 3;
	if (isXL) {
		slidesPerView = 2;
	}
	if (isMD) {
		slidesPerView = 1;
	}

	const cards = [];
	for (let i = 0; i < 20; i++) {
		cards.push(
			<SwiperSlide key={i}>
				<div className={cls.review}>
					<div className={cls.reviewHead}>
						<User
							name='Junior Garcia'
							description={
								<Link target='_blank' href='https://twitter.com/jrgarciadev'>
									@MarkMelior
								</Link>
							}
							avatarProps={{
								src: 'https://avatars.githubusercontent.com/u/30373425?v=4',
							}}
						/>
						<StarRating rating={i + 1} />
					</div>
					<p className={cls.text}>
						Очень рад сотрудничеству! Заказал у него создание личного
						сайта-портфолио, и результат превзошел все мои ожидания!
					</p>
				</div>
			</SwiperSlide>,
		);
	}

	return (
		<>
			<SlideHeading className='mt-20' text='Отзывы' />
			<div className={cn(cls.wrapper, 'content')}>
				<div className={cls.reviews}>
					<Swiper
						modules={[FreeMode, Autoplay]}
						spaceBetween={30}
						slidesPerView={slidesPerView}
						loop
						freeMode
						speed={5000}
						autoplay={{
							delay: 500,
						}}
						className={cls.reviewRow1}
					>
						{cards}
					</Swiper>
					<Swiper
						modules={[FreeMode, Autoplay]}
						spaceBetween={30}
						slidesPerView={slidesPerView}
						loop
						freeMode
						speed={6000}
						autoplay={{
							delay: 500,
							reverseDirection: true,
						}}
						className={cls.reviewRow2}
					>
						{cards}
					</Swiper>
				</div>
				{isSM || isOptimization ? (
					<Image
						src='/images/pages/encryption.png'
						alt='Blackhole'
						width={1920}
						height={1080}
						className={`${cls.video} noselect`}
					/>
				) : (
					<video
						autoPlay
						loop
						muted
						playsInline
						className={cn(cls.video, 'noselect')}
					>
						<source src='/videos/encryption.webm' />
					</video>
				)}
			</div>
		</>
	);
};

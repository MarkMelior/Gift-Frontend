'use client';

import { SlideHeading } from '@/shared/ui/HeadingSlide';
import { StarRating } from '@/shared/ui/StarRating';
import { User } from '@nextui-org/react';
import cn from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './ReviewsCarousel.module.scss';

interface ReviewsCarouselProps {
	className?: string;
}

export const ReviewsCarousel: FC<ReviewsCarouselProps> = ({
	className = '',
}) => {
	// const t = useTranslations('ReviewsCarousel');
	const cards = [];
	for (let i = 0; i < 5; i++) {
		cards.push(
			<SwiperSlide key={i}>
				<div className={cls.review}>
					<div className={cls.reviewHead}>
						<User
							name='Junior Garcia'
							description={
								// eslint-disable-next-line i18next/no-literal-string
								<Link target='_blank' href='https://twitter.com/jrgarciadev'>
									@jrgarciadev
								</Link>
							}
							avatarProps={{
								src: 'https://avatars.githubusercontent.com/u/30373425?v=4',
							}}
						/>
						<StarRating rating={i + 1} />
					</div>
					{/* eslint-disable-next-line i18next/no-literal-string */}
					<p className={cls.text}>
						Очень рад сотрудничеству! Заказал у него создание личного
						сайта-портфолио, и результат превзошел все мои ожидания!
					</p>
				</div>
			</SwiperSlide>,
		);
	}

	return (
		<div className={cn(cls.wrapper, 'content', className)}>
			<SlideHeading text='Отзывы' />
			<div className={cls.reviews}>
				<Swiper
					modules={[Autoplay]}
					spaceBetween={30}
					slidesPerView='auto'
					// slidesPerView={3}
					loop
					speed={5000}
					autoplay={{
						delay: 500,
					}}
					className={cls.reviewRow1}
				>
					{cards}
				</Swiper>
				<Swiper
					modules={[Autoplay]}
					spaceBetween={30}
					slidesPerView='auto'
					// slidesPerView={3}
					loop
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
			<video
				autoPlay
				loop
				muted
				playsInline
				className={cn(cls.video, 'noselect')}
			>
				<source src='/videos/encryption.webm' />
			</video>
		</div>
	);
};

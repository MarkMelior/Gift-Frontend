'use client';

import { ReviewCard, useGetReviewsQuery } from '@/entities/reviews';
import { useSettings } from '@/shared/config/settings';
import { MediaSize } from '@/shared/const';
import { mainReviewsIds } from '@/shared/const/main-reviews/main-reviews';
import { SlideHeading } from '@/shared/ui/slide-heading';
import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cls from './reviews-carousel.module.scss';

export const ReviewsCarousel: FC = () => {
	const isSM = useMediaQuery({ maxWidth: MediaSize.SM });
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });
	const isXL = useMediaQuery({ maxWidth: MediaSize.XL });
	const { optimization } = useSettings();

	const { data: reviews } = useGetReviewsQuery({
		limit: 10,
		ids: mainReviewsIds,
	});
	const halfLength =
		reviews && reviews.length > 0 ? Math.ceil(reviews.length / 2) : 0;
	const reviewsFirst = reviews?.slice(0, halfLength);
	const reviewsSecond = reviews?.slice(halfLength);

	let slidesPerView: number = 3;
	if (isXL) {
		slidesPerView = 2;
	}
	if (isMD) {
		slidesPerView = 1;
	}

	// todo
	if (!reviews) return <></>;

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
						{reviewsFirst?.map((review) => (
							<SwiperSlide key={review._id}>
								<ReviewCard review={review} />
							</SwiperSlide>
						))}
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
						{reviewsSecond?.map((review) => (
							<SwiperSlide key={review._id}>
								<ReviewCard review={review} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				{isSM || optimization ? (
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

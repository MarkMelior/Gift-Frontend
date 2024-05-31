'use client';

import { useFavorites } from '@/entities/favorites';
import { useProductsHistory } from '@/entities/products-history';
import { useRoleAccess } from '@/entities/user';
import { ProductModal, productModalActions } from '@/features/product-edit';
import { EditIcon } from '@/shared/assets/icon/Edit';
import { HeartIcon } from '@/shared/assets/icon/Heart';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { StarIcon } from '@/shared/assets/icon/Star';
import { Markets, MediaSize } from '@/shared/const';
import {
	ConvertData,
	convertCurrency,
	productLink,
} from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { useMessage } from '@/shared/ui/message';
import { ProductResponse } from '@melior-gift/zod-contracts';
import { Tooltip, useDisclosure } from '@nextui-org/react';
import cn from 'clsx';
import crypto from 'crypto';
import Image from 'next/image';
import Link from 'next/link';
import { FC, MouseEvent, memo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import cls from './card.module.scss';

export interface CardProps {
	data: ProductResponse;
	size?: 'sm' | 'md';
	isLoading?: boolean;
}

export const Card: FC<CardProps> = memo(({ data, size }) => {
	const swiperRef = useRef<SwiperRef>(null);
	const isPhone = useMediaQuery({ maxWidth: MediaSize.MD });
	const saltPagination = crypto.randomBytes(2).toString('hex');
	const { addProductHistory } = useProductsHistory(data.article);
	const { showMessage } = useMessage();
	const { isAdmin } = useRoleAccess();
	const dispatch = useAppDispatch();
	const {
		isOpen: isOpenEdit,
		onOpen: onOpenEdit,
		onOpenChange: onOpenChangeEdit,
	} = useDisclosure();

	const { isFavorites, toggleFavorites } = useFavorites(data);

	const handleMouseMove = (e: MouseEvent) => {
		const sliderLength = swiperRef.current?.swiper.slides.length;

		if (sliderLength && sliderLength > 1) {
			const sliderWidth = swiperRef.current?.swiper.width;
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
		el: `[data-slider-dots="${data.article}-${saltPagination}"]`,
		bulletClass: cls.bullet,
		bulletActiveClass: cls.bulletActive,
		renderBullet(_: number, className: string) {
			return `<div class="${className}"></div>`;
		},
	};

	const images =
		size === 'md' ? data.images.slice(0, 4) : data.images.slice(0, 3);

	const convertedPrice = convertCurrency(data.markets[0].price);
	const convertedOldPrice = convertCurrency(data.markets[0].oldPrice);
	const formattedDate = ConvertData(data.updatedAt, { isTime: false });

	return (
		<>
			<Link
				href={productLink(data.title, data.article)}
				className={cls.wrapper}
			>
				<div className={cls.top} data-size={size}>
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
										src={`${process.env.UPLOADS}/products/${data.article}/${image}`}
										alt={`Card ${index}`}
										className='noselect'
										loading='lazy'
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className={cls.hover}>
						<Button
							onClick={(e) => {
								e.preventDefault();
								window.open(data.markets[0].link, '_blank');

								addProductHistory(e);
							}}
						>
							Купить
						</Button>
						{isAdmin && (
							<>
								<Tooltip
									closeDelay={0}
									offset={10}
									content={'Редактировать'}
									placement='top'
								>
									<Button
										className='!w-min'
										isIconOnly
										onClick={(e) => {
											e.preventDefault();

											dispatch(productModalActions.updateProductModal(data));
											onOpenEdit();
										}}
									>
										<EditIcon />
									</Button>
								</Tooltip>
								{/* <ModalConfirm
									onConfirm={() => {
										dispatch(deleteProduct(data.article));
										showMessage({
											content: `Продукт ${data.article} успешно удалён!`,
											type: 'close',
										});
									}}
									description={`Вы уверены, что хотите удалить продукт ${data.article}?`}
								>
									<Tooltip
									closeDelay={0}
									offset={10}
									content={'Удалить'}
									placement='top'
								>
									<Button isIconOnly onClick={(e) => e.preventDefault()}>
										<DeleteIcon />
									</Button>
									</Tooltip>
								</ModalConfirm> */}
							</>
						)}
					</div>
				</div>
				<div className={cls.infoWrapper}>
					<div className={cls.info}>
						<div className={cls.stats}>
							<StarIcon />
							<span>{data.markets[0].rating}</span>
						</div>
						<div className={cls.stats}>
							<ReviewIcon />
							<span>{data.markets[0].reviewCount}</span>
						</div>
						<Tooltip
							closeDelay={0}
							offset={5}
							placement='bottom'
							showArrow
							content={
								<div className='flex items-center gap-2'>
									<Image
										src={`/images/icons/market/${
											Markets[data.markets[0].market].image
										}`}
										width={24}
										height={24}
										alt='test'
									/>
									<span>
										Статистика с {Markets[data.markets[0].market].name}{' '}
										{formattedDate}
									</span>
								</div>
							}
							className={cls.tooltip}
						>
							<Image
								src={`/images/icons/market/${
									Markets[data.markets[0].market].image
								}`}
								width={16}
								height={16}
								alt='test'
							/>
						</Tooltip>
					</div>
					{data.images.length > 1 && (
						<span
							className={cls.bulletWrapper}
							data-size={size}
							data-slider-dots={`${data.article}-${saltPagination}`}
						/>
					)}
				</div>
				<span className={cls.heading}>{data.title}</span>
				<span className={cls.cashback}>
					кэшбэк ~{convertCurrency((data.markets[0].price / 100) * 5)}
				</span>
				<div className={cls.bottom}>
					<div className={cls.price}>
						{convertedPrice}
						{convertedOldPrice && (
							<span className={cls.oldPrice}>{convertedOldPrice}</span>
						)}
					</div>
					<Button
						className={cn({ [cls.liked]: isFavorites }, 'p-2 rounded-full')}
						hoverColor={
							isFavorites ? '255, 66, 66' : 'var(--color-main-inverted-rgb)'
						}
						data-selected={isFavorites}
						clear
						slice
						onClick={(e: MouseEvent) => {
							e.preventDefault();
							toggleFavorites(e);
							showMessage({
								type: isFavorites ? 'heart-remove' : 'heart-add',
								content: isFavorites
									? `Подарок ${data.article} удален из избранного`
									: `Подарок ${data.article} добавлен в избранное`,
							});
						}}
						isIconOnly
						startContent={<HeartIcon />}
					/>
				</div>
			</Link>
			<ProductModal
				isOpen={isOpenEdit}
				isEdit
				onOpenChange={onOpenChangeEdit}
			/>
		</>
	);
});

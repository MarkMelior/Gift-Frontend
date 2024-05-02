'use client';

import { Notification } from '@/entities/notification';
import { CheckIcon } from '@/shared/assets/icon/Check';
import { CopyIcon } from '@/shared/assets/icon/Copy';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { StarIcon } from '@/shared/assets/icon/Star';
import { Markets } from '@/shared/const';
import { convertCurrency } from '@/shared/lib/features';
import { Button } from '@/shared/ui/button';
import {
	ProductCardResponse,
	ProductMarkets,
} from '@melior-gift/zod-contracts';
import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo, useState } from 'react';
import cls from './links-panel.module.scss';

interface LinksPanelProps {
	product: ProductCardResponse;
}

export const LinksPanel: FC<LinksPanelProps> = memo(({ product }) => {
	const [showNotification, setShowNotification] = useState(false);

	const renderLinks = (markets: ProductMarkets) => {
		const convertedPrice = convertCurrency(markets.price);
		const convertedOldPrice = convertCurrency(markets.oldPrice);

		return (
			<div className={cls.link} key={markets.market}>
				<div className={cls.header}>
					<div className={cls.price}>
						{convertedPrice}
						{convertedOldPrice && (
							<span className={cls.oldPrice}>{convertedOldPrice}</span>
						)}
					</div>
					<div className='flex items-center gap-2'>
						<div className={cls.stats}>
							<StarIcon />
							<span>{markets.rating}</span>
						</div>
						<div className={cls.stats}>
							<ReviewIcon />
							<span>{markets.reviewCount}</span>
						</div>
					</div>
				</div>
				<Link href={markets.link} target='_blank' className={cls.buttons}>
					<Button
						startContent={
							<Image
								src={`/images/icons/market/${Markets[markets.market].image}`}
								width={24}
								height={24}
								alt='test'
							/>
						}
						hoverColor={Markets[markets.market].color}
					>
						{Markets[markets.market].name}
					</Button>
					<Tooltip
						closeDelay={0}
						offset={5}
						placement='top'
						content='Скопировать ссылку'
						showArrow
					>
						<Button
							disableRipple
							startContent={<CopyIcon />}
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(markets.link).then(() => {
									setShowNotification(true);
								});
							}}
						/>
					</Tooltip>
				</Link>
			</div>
		);
	};

	return (
		<div className={cls.wrapper}>
			{product.markets.map((markets) => renderLinks(markets))}

			{showNotification && (
				<Notification
					message='Ссылка скопирована в буфер обмена'
					duration={2000}
					placement='top'
					onClose={() => setShowNotification(false)}
					closeOnClick
					startContent={
						<CheckIcon
							width={16}
							height={16}
							color='hsl(var(--gift-success))'
							isSelected
						/>
					}
				/>
			)}
		</div>
	);
});

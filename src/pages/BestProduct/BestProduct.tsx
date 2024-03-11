'use client';

import { useSlider } from '@/shared/lib/hooks/deprecated/useSlider';
import { Card } from '@/widgets/Card';
import { Heading } from '@/widgets/Heading';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './BestProduct.module.scss';

interface BestProductProps {
	className?: string;
}

export const BestProduct: FC<BestProductProps> = ({ className = '' }) => {
	const t = useTranslations('BestProduct');
	const {
		sliderRef,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		scrollToNextCard,
		scrollToPrevCard,
		goToPage,
	} = useSlider({ autoSlideDuration: 5000 });

	const cards = [];
	const pagination = [];
	for (let i = 0; i < 7; i++) {
		cards.push(
			<Card
				key={i}
				oldPrice={58600}
				price={29245}
				title={`${i + 1}. Xiaomi Mi Power Bank 3 20000 mAh`}
				defaultMarket={'ozon'}
				images={['/images/temp/cat.png']}
				rating={4.5}
				reviewCount={10}
			/>,
		);
		pagination.push(
			<button key={i} onClick={() => goToPage(i)}>
				{i + 1}
			</button>,
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
				<div className={cls.icon}>
					<i onClick={scrollToPrevCard} />
				</div>
				<div
					className={cls.slider}
					ref={sliderRef}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
				>
					{cards}
				</div>
				<div className={cls.icon}>
					<i onClick={scrollToNextCard} />
				</div>
			</div>
			<div className='pagination'>{pagination}</div>
		</section>
	);
};

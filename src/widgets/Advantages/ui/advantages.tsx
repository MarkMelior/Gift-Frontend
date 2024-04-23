'use client';

import { getSettingsOptimization } from '@/features/settings';
import { MediaSize } from '@/shared/const';
import { Button } from '@/shared/ui/button';
import { CardRotate } from '@/shared/ui/card-rotate';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import cls from './advantages.module.scss';

export const Advantages: FC = memo(() => {
	const { theme } = useTheme();
	const isOptimization = useSelector(getSettingsOptimization);

	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isMounted) return;

	return (
		<section className={cn(cls.wrapper, 'content')}>
			<div className={cls.lines} data-optimization={isOptimization}>
				<div className={cls.line}>
					<div className={cls.lineMask}>
						<div />
					</div>
				</div>
				<div className={cls.line}>
					<div className={cls.lineMask}>
						<div />
					</div>
				</div>
			</div>
			<MediaQuery minWidth={MediaSize.SM}>
				<Image
					src='/images/pages/design-advantages.png'
					width={2640}
					height={1010}
					alt='Изображение на фоне'
					className={`${cls.backgroundImage} noselect`}
				/>
			</MediaQuery>
			<Button
				customVariant='gradient'
				lines
				className={cn(cls.icon, 'rounded-xl')}
			>
				<Image
					src='/images/icons/gift.svg'
					width={32}
					height={32}
					alt='Иконка подарка'
					className='noselect'
				/>
			</Button>
			<div className={cls.heading}>
				<h2>Easy Gift</h2>
				<p>Каждый подарок может быть искусством</p>
			</div>
			<div className={cls.cardRotateWrapper}>
				<CardRotate
					name='Расширяемый'
					color='#80eead'
					icon='/images/pages/scale_more.png'
					text='Проект построен на модульной структуре, обеспечивающей легкость добавления новых функций и компонентов'
				/>
				<CardRotate
					name='Стильный'
					color='#ff6464'
					icon='/images/pages/design_palette.png'
					text='Привлекательный дизайн, следующий современным визуальным трендам и лучшим практикам веб-дизайна'
				/>
				<CardRotate
					name='Современный'
					color='#8875ff'
					icon='/images/pages/code.png'
					text='Интеграция новейших технологий разработки, обеспечивающих высокую производительность'
				/>
			</div>
			{theme === 'dark' && (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: 'easeIn' }}
					className={`${cls.image} noselect`}
				>
					{/* <Image
						src='/images/pages/glow-about.png'
						width={1612}
						height={1698}
						alt='test'
					/> */}
					<img
						src='/images/pages/deprecated/glow-about-default.png'
						alt='Background glow image'
					/>
				</motion.div>
			)}
		</section>
	);
});

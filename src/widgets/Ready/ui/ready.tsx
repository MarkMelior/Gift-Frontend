'use client';

import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Button } from '@/shared/ui/button';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo, useEffect, useState } from 'react';
import cls from './ready.module.scss';

export const Ready: FC = memo(() => {
	const [isMounted, setMounted] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<Button
				customVariant='gradient'
				lines
				className={cn(cls.icon, 'rounded-2xl')}
			>
				<Image
					src='/images/icons/logo-melior-white.svg'
					width={52}
					height={52}
					alt='Логотип сайта'
					className='noselect'
					style={{ opacity: 1 }}
				/>
			</Button>
			<div className={cls.heading}>
				<h3>Готовы выбрать подарок?</h3>
				<p>Восхитительно умная платформа для выбора подарков - бесплатно</p>
			</div>
			<Link href='/shop'>
				<Button
					starlight
					className='py-5 px-12 rounded-xl'
					customVariant='layer'
					startContent={<GiftIcon />}
				>
					Найти подарок
				</Button>
			</Link>
			{theme === 'dark' && isMounted && (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 3, ease: 'easeIn' }}
					className={`${cls.image} noselect`}
				>
					{/* <Image
						src='/images/pages/glow-ready.png'
						alt='Фоновое изображение'
						width={1488}
						height={1674}
					/> */}
					<img
						src='/images/pages/deprecated/glow-ready-default.png'
						alt='Background glow image'
					/>
				</motion.div>
			)}
		</div>
	);
});

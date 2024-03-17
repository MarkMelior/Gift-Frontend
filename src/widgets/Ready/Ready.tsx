'use client';

import { Gift } from '@/shared/assets/icon/Gift';
import { Link } from '@/shared/config/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './Ready.module.scss';

interface ReadyProps {
	className?: string;
}

export const Ready: FC<ReadyProps> = ({ className = '' }) => {
	const t = useTranslations('Ready');

	return (
		<div className={cn(cls.wrapper, 'content', className)}>
			<Button
				customVariant='gradient'
				lines
				className={cn(cls.icon, 'rounded-2xl')}
			>
				<Image
					src='/images/icons/logo-melior-white.svg'
					width={52}
					height={52}
					alt={t('logo-image-alt')}
					className='noselect'
					style={{ opacity: 1 }}
				/>
			</Button>
			<div className={cls.heading}>
				<h3>{t('title')}</h3>
				<p>{t('description')}</p>
			</div>
			<Link href='/shop'>
				<Button
					starlight
					className='py-5 px-12 rounded-xl'
					customVariant='layer'
					startContent={<Gift />}
				>
					{t('button')}
				</Button>
			</Link>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 3, ease: 'easeIn' }}
				className={`${cls.image} noselect`}
			>
				<Image
					src='/images/pages/glow-ready.png'
					alt={t('background-image-alt')}
					width={1488}
					height={1674}
				/>
			</motion.div>
		</div>
	);
};

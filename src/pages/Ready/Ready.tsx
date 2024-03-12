import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
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
			<Button
				starlight
				className='py-5 px-12 rounded-xl'
				customVariant='layer'
				startContent={
					<Image
						src='/images/icons/gift.svg'
						width={24}
						height={24}
						alt={t('button-image-alt')}
						className='noselect'
					/>
				}
			>
				{t('button')}
			</Button>
			<Image
				src='/images/pages/glow-ready.png'
				alt={t('background-image-alt')}
				className={cn(cls.image, 'noselect')}
				width={1488}
				height={1674}
			/>
		</div>
	);
};

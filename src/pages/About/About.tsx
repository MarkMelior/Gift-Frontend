import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import cls from './About.module.scss';

interface AboutProps {
	className?: string;
	children?: ReactNode;
}

export const About: FC<AboutProps> = ({ className = '' }) => {
	const t = useTranslations('About');

	return (
		<div className={cn(cls.content, className, 'content')}>
			<Image
				src='/images/pages/glow-about.png'
				width={1612}
				height={1698}
				alt={t('background-glow-image-alt')}
				className={`${cls.image} noselect`}
			/>
			<div className={cls.heading}>
				<Image
					width={24}
					height={24}
					src={'/images/icons/infinity.svg'}
					alt={t('heading-image-alt')}
					className='noselect'
				/>
				<h3>{t('title')}</h3>
				<p>{t('description')}</p>
			</div>
			<div className={cls.backgroundWrapper}>
				<div className={cls.swipeWrapper}>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/microphone.svg'}
							alt={t('swipe-image-alt-1')}
							className='noselect'
						/>
						<p>{t('swipe-title-1')}</p>
						<p className={cls.swipeDescription}>{t('swipe-description-1')}</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/list.svg'}
							alt={t('swipe-image-alt-2')}
							className='noselect'
						/>
						<p>{t('swipe-title-2')}</p>
						<p className={cls.swipeDescription}>{t('swipe-description-2')}</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/list-success.svg'}
							alt={t('swipe-image-alt-3')}
							className='noselect'
						/>
						<p>{t('swipe-title-3')}</p>
						<p className={cls.swipeDescription}>{t('swipe-description-3')}</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/search-symbol.svg'}
							alt={t('swipe-image-alt-4')}
							className='noselect'
						/>
						<p>{t('swipe-title-4')}</p>
						<p className={cls.swipeDescription}>{t('swipe-description-4')}</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/save.svg'}
							alt={t('swipe-image-alt-5')}
							className='noselect'
						/>
						<p>{t('swipe-title-5')}</p>
						<p className={cls.swipeDescription}>{t('swipe-description-5')}</p>
					</div>
				</div>
				<Image
					src='/images/pages/design-about.png'
					width={1320}
					height={460}
					alt={t('background-image-alt')}
					className={`${cls.backgroundImage} noselect`}
				/>
			</div>
		</div>
	);
};

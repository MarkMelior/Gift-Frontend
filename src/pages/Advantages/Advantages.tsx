import { Button } from '@/shared/ui/Button';
import { CardRotate } from '@/shared/ui/CardRotate';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './Advantages.module.scss';

interface AdvantagesProps {
	className?: string;
}

export const Advantages: FC<AdvantagesProps> = ({ className = '' }) => {
	const t = useTranslations('Advantages');

	return (
		<section className={cn(cls.content, className, 'content')}>
			<div className={cls.lines}>
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
			<Image
				src='/images/pages/design-advantages.png'
				width={2640}
				height={1010}
				alt={t('background-image-alt')}
				className={`${cls.backgroundImage} noselect`}
			/>
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
				<h2>{t('title')}</h2>
				<p>{t('description')}</p>
			</div>
			<div className={cls.cardRotateWrapper}>
				<CardRotate
					name={t('card-1-title')}
					color='#80eead'
					icon='/images/pages/scale_more.png'
					text={t('card-1-description')}
				/>
				<CardRotate
					name={t('card-2-title')}
					color='#ff6464'
					icon='/images/pages/design_palette.png'
					text={t('card-2-description')}
				/>
				<CardRotate
					name={t('card-3-title')}
					color='#8875ff'
					icon='/images/pages/code.png'
					text={t('card-3-description')}
				/>
			</div>
		</section>
	);
};

import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { CardRotate } from '@/shared/ui/CardRotate';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './Advantages.module.scss';

interface AdvantagesProps {
	className?: string;
}

export const Advantages: FC<AdvantagesProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<div className={cl(cls.Advantages, {}, [className])}>
			<div className={cl(cls.Content, {}, ['content'])}>
				<div className={cls.BackgroundWrapper}>
					<div className={cls.Lines}>
						<div className={cls.Line}>
							<div className={cls.LineMask}>
								<div />
							</div>
						</div>
						<div className={cls.Line}>
							<div className={cls.LineMask}>
								<div />
							</div>
						</div>
					</div>
					<Image
						src='/images/pages/design-advantages.png'
						width={2640}
						height={1010}
						alt='Фоновое изображение'
						className={`${cls.BackgroundImage} noselect`}
					/>
					<Button variant='gradient' lines className={cls.Icon}>
						<Image
							src='/images/icons/gift.svg'
							width={32}
							height={32}
							alt='Иконка подарка'
							className='noselect'
						/>
					</Button>
					<div className={cls.Heading}>
						<h2>Easy Gift</h2>
						<p>{t('Каждый подарок может быть искусством')}</p>
					</div>
					<div className={cls.CardRotateWrapper}>
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
				</div>
			</div>
		</div>
	);
};

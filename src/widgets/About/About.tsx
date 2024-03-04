import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { SquareLines } from '@/shared/ui/SquareLines';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './About.module.scss';

interface AboutProps {
	className?: string;
}

export const About: FC<AboutProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<div className={cl(cls.About, {}, [className])}>
			<div className={cl(cls.Content, {}, ['content'])}>
				<Image
					src='/images/pages/design-about-top.png'
					width={2640}
					height={1010}
					alt='Background image'
					className={cls.Image}
				/>
				<SquareLines>
					<span className={cls.box} />
				</SquareLines>
				{/* <Image
					src='/images/pages/glow-about.png'
					width={1612}
					height={1698}
					alt='Background glow image'
					className={cls.Image}
					// className='noselect'
				/>
				<Image
					src='/images/pages/design-about-bottom.png'
					width={1320}
					height={460}
					alt='Background image'
					className={cls.Image}
					// className='noselect'
				/>
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
				/> */}
			</div>
		</div>
	);
};

import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import cls from './About.module.scss';

interface AboutProps {
	className?: string;
	children?: ReactNode;
}

export const About: FC<AboutProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<div className={cl(cls.Content, {}, [className, 'content'])}>
			<Image
				src='/images/pages/glow-about.png'
				width={1612}
				height={1698}
				alt='Background glow image'
				className={`${cls.Image} noselect`}
				// className='noselect'
			/>
			<div className={cls.Heading}>
				<Image
					width={24}
					height={24}
					src={'/images/icons/infinity.svg'}
					alt='Иконка бесконечности'
					className='noselect'
				/>
				<h3>{t('Все, что вам нужно, на одной платформе')}</h3>
				<p>
					{t(
						'От прототипирования к производству - разрабатывайте, не переключая вкладки',
					)}
				</p>
			</div>
			<div className={cls.BackgroundWrapper}>
				<div className={cls.SwipeWrapper}>
					<div className={cls.Swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/microphone.svg'}
							alt='Иконка бесконечности'
							className='noselect'
						/>
						<p>Transcribe voice notes</p>
						<p className={cls.SwipeDescription}>with human-level accuracy</p>
					</div>
					<div className={cls.Swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/list.svg'}
							alt='Иконка бесконечности'
							className='noselect'
						/>
						<p>Generate article outlines</p>
						<p className={cls.SwipeDescription}>from your scattered thoughts</p>
					</div>
					<div className={cls.Swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/list-success.svg'}
							alt='Иконка бесконечности'
							className='noselect'
						/>
						<p>List key takeaways and action</p>
						<p className={cls.SwipeDescription}>
							items from your meeting notes
						</p>
					</div>
					<div className={cls.Swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/search-symbol.svg'}
							alt='Иконка бесконечности'
							className='noselect'
						/>
						<p>Fix grammar, spelling,</p>
						<p className={cls.SwipeDescription}>and improve your writing</p>
					</div>
					<div className={cls.Swipe}>
						<Image
							width={40}
							height={40}
							src={'/images/icons/save.svg'}
							alt='Иконка бесконечности'
							className='noselect'
						/>
						<p>Save your own</p>
						<p className={cls.SwipeDescription}>custom prompts</p>
					</div>
				</div>
				<Image
					src='/images/pages/design-about.png'
					width={1320}
					height={460}
					alt='Background image'
					className={`${cls.BackgroundImage} noselect`}
					// className='noselect'
				/>
			</div>
		</div>
	);
};

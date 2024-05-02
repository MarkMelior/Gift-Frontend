import { InfinityIcon } from '@/shared/assets/icon/Infinity';
import cn from 'clsx';
import Image from 'next/image';
import { FC, memo } from 'react';
import cls from './About.module.scss';

export const About: FC = memo(() => {
	return (
		<section className={cn(cls.wrapper, 'content')}>
			<div className={cls.heading}>
				<InfinityIcon width={24} height={24} />
				<h3>Всё, что вам нужно, на одной платформе</h3>
				<p>От поиска к удивлению - найдите идеальный подарок здесь и сейчас.</p>
			</div>
			<div className={cls.backgroundWrapper}>
				<div className={cls.swipeWrapper}>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/microphone.svg'
							alt='Иконка микрофона'
							className='noselect'
						/>
						<p>Поиск по голосу</p>
						<p className={cls.swipeDescription}>
							нейросеть найдёт нужный подарок
						</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/list.svg'
							alt='Иконка списка'
							className='noselect'
						/>
						<p>Сравнивайте цены</p>
						<p className={cls.swipeDescription}>
							и отзывы любимых маркетплейсов
						</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/list-success.svg'
							alt='Иконка списка с галочкой'
							className='noselect'
						/>
						<p>Только проверенные</p>
						<p className={cls.swipeDescription}>продавцы и подарки</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/search-symbol.svg'
							alt='Иконка поиска по символам'
							className='noselect'
						/>
						<p>Удобный поиск</p>
						<p className={cls.swipeDescription}>ищи подарки быстро и просто</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/save.svg'
							alt='Иконка сохранения'
							className='noselect'
						/>
						<p>Сохраняй в избранное</p>
						<p className={cls.swipeDescription}>
							подарки, которые тебе понравились
						</p>
					</div>
				</div>
				<Image
					src='/images/pages/design-about.png'
					width={1320}
					height={460}
					alt='Фоновое изображение'
					className={`${cls.backgroundImage} noselect`}
				/>
			</div>
		</section>
	);
});

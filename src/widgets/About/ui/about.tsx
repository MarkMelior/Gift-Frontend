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
				<h3>Все, что вам нужно, на одной платформе</h3>
				<p>
					От прототипирования к производству - разрабатывайте, не переключая
					вкладки
				</p>
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
						<p>Расшифровывайте голосовые заметки</p>
						<p className={cls.swipeDescription}>
							с точностью до человеческого уровня
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
						<p>Создавайте наброски статей</p>
						<p className={cls.swipeDescription}>из ваших рассеянных мыслей</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/list-success.svg'
							alt='Иконка списка с галочкой'
							className='noselect'
						/>
						<p>Перечислите основные выводы и действия</p>
						<p className={cls.swipeDescription}>из ваших заметок о собраниях</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/search-symbol.svg'
							alt='Иконка поиска по символам'
							className='noselect'
						/>
						<p>Исправьте грамматику, орфографию</p>
						<p className={cls.swipeDescription}>и улучшите свой почерк</p>
					</div>
					<div className={cls.swipe}>
						<Image
							width={40}
							height={40}
							src='/images/icons/save.svg'
							alt='Иконка сохранения'
							className='noselect'
						/>
						<p>Сохраните свои собственные</p>
						<p className={cls.swipeDescription}>пользовательские подсказки</p>
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

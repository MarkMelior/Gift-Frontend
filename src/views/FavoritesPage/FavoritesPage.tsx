import { TopPage } from '@/widgets/TopPage';
import { Image } from '@nextui-org/react';
import { FC } from 'react';
import cls from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
	// const t = useTranslations('Favorites');

	return (
		<div className={cls.wrapper}>
			<TopPage
				compact
				title='Избранное'
				description='Войдите в аккаунт, чтобы избранные товары сохранялись в облаке'
				note='Моё избранное'
				imageContent={
					<Image
						src='/images/pages/heart.png'
						alt='image'
						width={1080}
						height={1080}
						className='noselect'
					/>
				}
			/>
		</div>
	);
};

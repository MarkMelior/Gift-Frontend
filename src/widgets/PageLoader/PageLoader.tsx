import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {}

export const PageLoader: FC<PageLoaderProps> = () => {
	const t = useTranslations();

	return (
		<section className={cls.PageLoader}>
			<div className={cls.Loader}>
				<span className={cls.Spinner} />
				<Image
					src='/images/icons/logo-melior-white.svg'
					alt='Логотип'
					width={100}
					height={100}
				/>
				<p>{t('Загрузка')}</p>
			</div>
		</section>
	);
};

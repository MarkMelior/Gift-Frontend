import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {}

export const PageLoader: FC<PageLoaderProps> = () => {
	const t = useTranslations('PageLoader');

	return (
		<section className={cls.pageLoader}>
			<div className={cls.loader}>
				<span className={cls.spinner} />
				<Image
					src='/images/icons/logo-melior-white.svg'
					alt={t('logo-alt')}
					width={100}
					height={100}
				/>
				<p>{t('title')}</p>
			</div>
		</section>
	);
};

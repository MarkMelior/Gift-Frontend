import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import cls from './page-loader.module.scss';

interface PageLoaderProps {
	classNames?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ classNames }) => {
	return (
		<section className={cn(cls.pageLoader, classNames)}>
			<div className={cls.loader}>
				<span className={cls.spinner} />
				<Image
					src='/images/icons/logo-melior-white.svg'
					alt='Логотип'
					width={100}
					height={100}
				/>
				<p>Загрузка</p>
			</div>
		</section>
	);
};

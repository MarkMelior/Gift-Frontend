import Image from 'next/image';
import { FC, memo } from 'react';
import cls from './PageLoader.module.scss';

export const PageLoader: FC = memo(() => {
	return (
		<section className={cls.pageLoader}>
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
});

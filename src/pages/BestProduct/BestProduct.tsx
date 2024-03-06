import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Heading } from '@/widgets/Heading';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './BestProduct.module.scss';

interface BestProductProps {
	className?: string;
}

export const BestProduct: FC<BestProductProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<div className={cl(cls.BestProduct, {}, [className, 'content'])}>
			<Image
				src='/images/pages/glow-best.png'
				width={1624}
				height={862}
				alt='Background glow image'
				className={`${cls.Image} noselect`}
			/>
			<Heading
				title='Лучшие подарки'
				description='Не стесняйтесь настраивать свои отчеты. Используйте нашу супертаблицу вместо многократного экспорта и импорта данных'
				note='Топ из топов'
				doubleTitle={false}
				center
				customSize={3}
			></Heading>
		</div>
	);
};

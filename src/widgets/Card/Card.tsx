import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import cls from './Card.module.scss';

type Market = 'ozon' | 'yandex' | 'aliexpress' | 'wildberries' | 'sber';

interface CardProps {
	price: number;
	title: string;
	defaultMarket: Market;
	images: string[];

	className?: string;
	rating?: number;
	reviewCount?: number;
	oldPrice?: number;
}

export const Card: FC<CardProps> = ({
	price,
	title,
	defaultMarket,
	images,

	className = '',
	rating,
	reviewCount,
	oldPrice,
}) => {
	const t = useTranslations();

	return <div className={cl(cls.Card, {}, [className])}></div>;
};

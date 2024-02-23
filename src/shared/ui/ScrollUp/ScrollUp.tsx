'use client';

import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import cls from './ScrollUp.module.scss';

interface ScrollUpProps {
	className?: string;
}

export const ScrollUp: FC<ScrollUpProps> = ({ className = '' }) => {
	const t = useTranslations();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 200) {
				// Вы можете изменить этот порог по вашему усмотрению
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Button
			radius='radius-full'
			variant='default'
			onClick={scrollToTop}
			className={cl(cls.ScrollUp, { [cls.Hide]: !isVisible }, [
				className,
				isVisible ? cls.visible : cls.hidden,
			])}
		>
			{t('Наверх')}
		</Button>
	);
};
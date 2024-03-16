'use client';

import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import cls from './ScrollUp.module.scss';

interface ScrollUpProps {
	className?: string;
}

export const ScrollUp: FC<ScrollUpProps> = ({ className = '' }) => {
	const t = useTranslations('ScrollUp');
	const [isVisible, setIsVisible] = useState(false);
	const [prevScrollY, setPrevScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsVisible(currentScrollY < prevScrollY && currentScrollY > 1500);
			setPrevScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollY]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Button
			customVariant='default'
			onClick={scrollToTop}
			className={cn(
				cls.scrollUp,
				{ [cls.Hide]: !isVisible },
				className,
				isVisible ? cls.visible : cls.hidden,
				'rounded-full',
			)}
		>
			{t('top')}
		</Button>
	);
};

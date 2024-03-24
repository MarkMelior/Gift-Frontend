'use client';

import { ArrowUpIcon } from '@/shared/assets/icon/ArrowUp';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import { FC, useEffect, useState } from 'react';
import cls from './ScrollUp.module.scss';

interface ScrollUpProps {
	className?: string;
}

export const ScrollUp: FC<ScrollUpProps> = ({ className }) => {
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
			<ArrowUpIcon width='1.5rem' height='1.5rem' />
			Наверх
		</Button>
	);
};

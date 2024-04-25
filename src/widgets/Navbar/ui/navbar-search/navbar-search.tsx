'use client';

import { getRouteMain } from '@/shared/const';
import { Logo } from '@/shared/ui/logo';
import cn from 'clsx';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { NavbarInput } from '../navbar-input/navbar-input';
import cls from './navbar-search.module.scss';

export const NavbarSearch = memo(() => {
	const [isScrollingDown, setIsScrollingDown] = useState(true);
	const [prevScrollY, setPrevScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsScrollingDown(currentScrollY < prevScrollY || currentScrollY < 150);
			setPrevScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollY]);

	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		isMounted && (
			<div
				className={cls.search}
				style={{
					transform: isScrollingDown ? 'translateY(0)' : 'translateY(-100%)',
				}}
			>
				<div className={cn(cls.contentSearch, 'content')}>
					<Link href={getRouteMain()} className={cls.logo}>
						<Logo scale={0.75} />
					</Link>
					<NavbarInput />
				</div>
			</div>
		)
	);
});

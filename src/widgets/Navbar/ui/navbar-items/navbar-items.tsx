'use client';

import { MediaSize } from '@/shared/const';
import cn from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavbarItemsList } from '../../model/items';
import cls from './navbar-items.module.scss';

export const NavbarItems: FC = () => {
	const pathname = usePathname();
	const isLG = useMediaQuery({ maxWidth: MediaSize.LG });

	const isActive = useCallback(
		(href: string) => {
			return pathname === href ||
				(pathname.startsWith(href) && pathname[href.length] === '/')
				? cls.selected
				: '';
		},
		[pathname],
	);

	return (
		<>
			{NavbarItemsList.map(({ path, text, icon }) => (
				<li key={path} className={cn(cls.wrapper, isActive(path))}>
					<Link href={path}>
						{isLG && icon}
						{text}
					</Link>
				</li>
			))}
		</>
	);
};

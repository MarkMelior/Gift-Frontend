'use client';

import { MediaSize } from '@/shared/const';
import cn from 'clsx';
import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavbarDesktop } from '../navbar-desktop/navbar-desktop';
import { NavbarMobile } from '../navbar-mobile/navbar-mobile';
import { NavbarSearch } from '../navbar-search/navbar-search';
import cls from './navbar.module.scss';

interface NavbarProps {
	className?: string;
	shouldHideOnScroll?: boolean;
}

export const Navbar = memo(({ className, shouldHideOnScroll }: NavbarProps) => {
	const isMobile = useMediaQuery({ maxWidth: MediaSize.SM });
	// const { isAdmin } = useRoleAccess();

	return (
		<>
			<header className={cn(cls.wrapper, className)}>
				<nav className={cn(cls.content, 'content')}>
					{isMobile ? <NavbarMobile /> : <NavbarDesktop />}
				</nav>
			</header>
			{isMobile && <NavbarSearch />}
			<div className={cls.spacer} />
			{/* {isAdmin && <NavbarAdmin />} */}
		</>
	);
});

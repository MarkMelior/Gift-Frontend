'use client';

import { FC, memo, useEffect, useState } from 'react';
import { NavbarItems } from '../navbar-items/navbar-items';
import { NavbarProfile } from '../navbar-profile/navbar-profile';
import cls from './navbar-mobile.module.scss';

export const NavbarMobile: FC = memo(() => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		isMounted && (
			<ul className={cls.wrapper}>
				<NavbarItems />
				<li>
					<NavbarProfile />
				</li>
			</ul>
		)
	);
});

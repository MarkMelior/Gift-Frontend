import { FC } from 'react';
import { NavbarItems } from '../navbar-items/navbar-items';
import { NavbarProfile } from '../navbar-profile/navbar-profile';
import cls from './navbar-mobile.module.scss';

export const NavbarMobile: FC = () => {
	return (
		<ul className={cls.wrapper}>
			<NavbarItems />
			<li>
				<NavbarProfile />
			</li>
		</ul>
	);
};

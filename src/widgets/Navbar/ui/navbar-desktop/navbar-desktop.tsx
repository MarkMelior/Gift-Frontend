'use client';

import { useSettings } from '@/shared/config/settings';
import { MediaSize, getRouteMain } from '@/shared/const';
import { Logo } from '@/shared/ui/logo';
import { Spinner, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import MediaQuery from 'react-responsive';
import { NavbarInput } from '../navbar-input/navbar-input';
import { NavbarItems } from '../navbar-items/navbar-items';
import { NavbarProfile } from '../navbar-profile/navbar-profile';
import cls from './navbar-desktop.module.scss';

export const NavbarDesktop: FC = () => {
	const { globalIsLoading } = useSettings();

	return (
		<>
			<div className={cls.left}>
				<Link href={getRouteMain()} className={cls.logo}>
					<Logo />
				</Link>
				<NavbarInput />
				{globalIsLoading && (
					<MediaQuery minWidth={MediaSize.SM}>
						<Tooltip
							offset={15}
							closeDelay={0}
							showArrow
							content='Что-то загружается...'
							className={cls.tooltip}
						>
							<Spinner size='sm' className={cls.spinner} />
						</Tooltip>
					</MediaQuery>
				)}
			</div>
			<ul className={cls.center}>
				<NavbarItems />
			</ul>
			<ul className={cls.right}>
				<NavbarProfile />
			</ul>
		</>
	);
};

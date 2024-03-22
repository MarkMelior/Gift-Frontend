'use client';

import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import MediaQuery from 'react-responsive';
import cls from './NavigationPanel.module.scss';
import { NavigationPanelData } from './data';

interface NavigationPanelProps {
	className?: string;
}

export const NavigationPanel: FC<NavigationPanelProps> = ({
	className = '',
}) => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		return pathname === href ? cls.selected : '';
	};

	return (
		<section className={cn(cls.wrapper, className, 'content')}>
			<Blackhole />
			<MediaQuery minWidth={MediaSize.MD}>
				<nav className={cls.panel}>
					{Object.keys(NavigationPanelData).map((key) => {
						const { to, image, alt, title, description } =
							NavigationPanelData[key];
						return (
							<Link key={key} href={to} className={isActive(to)}>
								<Button key={key} variant='flat' className={cls.button}>
									<div className={cls.item}>
										<Image
											src={image}
											width={24}
											height={24}
											alt={alt}
											className='noselect'
										/>
										<p>{title}</p>
									</div>
									<p>{description}</p>
								</Button>
							</Link>
						);
					})}
				</nav>
			</MediaQuery>
		</section>
	);
};

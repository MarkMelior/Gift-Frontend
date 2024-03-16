'use client';

import { usePathname } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { NavigationPanelData } from '@/shared/const/navigationPanel';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import MediaQuery from 'react-responsive';
import cls from './NavigationPanel.module.scss';

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
			<MediaQuery minWidth={MediaSize.SM}>
				<nav className={cls.panel}>
					{Object.keys(NavigationPanelData).map((key) => {
						const { to, image, alt, title, description } =
							NavigationPanelData[key];
						return (
							// <Link key={key} href={to} className={isActive(to)}>
							<Button
								key={key}
								disabled
								variant='flat'
								className={cn(cls.button, '!w-full')}
							>
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
							// </Link>
						);
					})}
				</nav>
			</MediaQuery>
		</section>
	);
};

'use client';

import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { NavigationPanelData } from '@/shared/const/navigationPanel';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './NavigationPanel.module.scss';

interface NavigationPanelProps {
	className?: string;
}

export const NavigationPanel: FC<NavigationPanelProps> = ({
	className = '',
}) => {
	const t = useTranslations();
	const pathname = usePathname();

	const isActive = (href: string) => {
		return pathname === href ? cls.Selected : '';
	};

	return (
		<section className={cl(cls.Content, {}, [className, 'content'])}>
			<Blackhole />
			<nav className={cls.NavigationPanel}>
				{Object.keys(NavigationPanelData).map((key) => {
					const { to, image, alt, title, description } =
						NavigationPanelData[key];
					return (
						<Link key={key} href={to} className={isActive(to)}>
							<Button variant='flat' fullWidth className={cls.Button}>
								<div className={cls.Item}>
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
		</section>
	);
};

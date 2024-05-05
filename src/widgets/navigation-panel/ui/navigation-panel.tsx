'use client';

import { MediaSize } from '@/shared/const';
import cn from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavigationPanelData } from '../model/data';
import cls from './navigation-panel.module.scss';

interface NavigationPanelProps {
	className?: string;
}

export const NavigationPanel: FC<NavigationPanelProps> = memo(
	({ className }) => {
		const pathname = usePathname();
		const isPhone = useMediaQuery({ maxWidth: MediaSize.MD });

		if (isPhone) return;

		return (
			<section className={cn(cls.wrapper, className, 'content')}>
				{NavigationPanelData.map(({ to, image, alt, title, description }) => {
					return (
						<Link
							key={to}
							href={to}
							className={cn(cls.item, pathname === to && cls.selected)}
						>
							<div className='flex items-center gap-1'>
								{image}
								<p>{title}</p>
							</div>
							<span>{description}</span>
						</Link>
					);
				})}
			</section>
		);
	},
);

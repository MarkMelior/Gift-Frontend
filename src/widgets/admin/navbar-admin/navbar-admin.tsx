'use client';

import { Tooltip } from '@nextui-org/react';
import cn from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, memo } from 'react';
import cls from './navbar-admin.module.scss';

export const NavbarAdmin: FC = memo(() => {
	const pathname = usePathname();

	return (
		<div className={cls.wrapper}>
			<Tooltip offset={10} content={'Статистика'} placement='right'>
				<Link
					href={'/admin/dashboard'}
					className={cn(
						cls.item,
						pathname === '/admin/dashboard' && cls.active,
					)}
				>
					📊
				</Link>
			</Tooltip>
			<Tooltip offset={10} content={'Продукты'} placement='right'>
				<Link
					href={'/admin/products'}
					className={cn(cls.item, pathname === '/admin/products' && cls.active)}
				>
					📦
				</Link>
			</Tooltip>
			<Tooltip offset={10} content={'Отзывы'} placement='right'>
				<Link
					href={'/admin/reviews'}
					className={cn(cls.item, pathname === '/admin/reviews' && cls.active)}
				>
					👀
				</Link>
			</Tooltip>
			<Tooltip offset={10} content={'Пользователи'} placement='right'>
				<Link
					href={'/admin/users'}
					className={cn(cls.item, pathname === '/admin/users' && cls.active)}
				>
					❇️
				</Link>
			</Tooltip>
		</div>
	);
});

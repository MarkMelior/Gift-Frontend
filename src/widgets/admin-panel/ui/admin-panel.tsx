'use client';

import { useRoleAccess } from '@/entities/user';
import { MediaSize } from '@/shared/const';
import { Listbox, ListboxItem } from '@nextui-org/react';
import Link from 'next/link';
import { FC, ReactNode, memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './admin-panel.module.scss';

interface AdminPanelProps {
	children: ReactNode;
}

export const AdminPanel: FC<AdminPanelProps> = memo(({ children }) => {
	const { isAdmin } = useRoleAccess();
	const isXL = useMediaQuery({ maxWidth: MediaSize.XL });

	if (!isAdmin || isXL) return <>{children}</>;

	return (
		<div className={cls.wrapper}>
			<div className={cls.panel}>
				<nav className={cls.items}>
					<Listbox aria-label='Actions'>
						<ListboxItem
							as={Link}
							href={'/admin/stats'}
							key='stats'
							startContent='📊'
						>
							Статистика
						</ListboxItem>
						<ListboxItem
							as={Link}
							href={'/admin/products'}
							key='products'
							startContent='📦'
							color='primary'
						>
							Продукты
						</ListboxItem>
						<ListboxItem
							as={Link}
							href={'/admin/reviews'}
							key='reviews'
							startContent='👀'
						>
							Отзывы
						</ListboxItem>
						<ListboxItem
							as={Link}
							href={'/admin/users'}
							key='users'
							startContent='❇️'
						>
							Пользователи
						</ListboxItem>
					</Listbox>
				</nav>
			</div>
			<div className={cls.children}>{children}</div>
		</div>
	);
});

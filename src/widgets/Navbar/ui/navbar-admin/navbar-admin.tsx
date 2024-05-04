'use client';

import { Listbox, ListboxItem } from '@nextui-org/react';
import Link from 'next/link';
import { FC, memo } from 'react';
import cls from './navbar-admin.module.scss';

export const NavbarAdmin: FC = memo(() => {
	return (
		<div className={cls.wrapper}>
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
		</div>
	);
});

'use client';

import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
// import { LangSwitcher } from '@/shared/ui/LangSwitcher';
import { Logo } from '@/shared/ui/Logo';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className = '' }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState(false);
	// const authData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	// if (authData) {
	// 	return (
	// 		<header className={classNames(mainClass, {}, [className])}>
	// 			<HStack gap='16' className={cls.actions}>
	// 				<NotificationButton />
	// 				<AvatarDropdown />
	// 			</HStack>
	// 		</header>
	// 	);
	// }

	return (
		<header className={cl(cls.Navbar, {}, [className])}>
			<div className={cl(cls.Content, {}, ['content'])}>
				<div className={cl(cls.Left, {}, [])}>
					<Link href='/' className={cl(cls.Logo, {}, [])}>
						<Logo />
					</Link>
				</div>
				<div className={cl(cls.Center, {}, [])}>
					<Link href='/'>Главная страница</Link>
					<Link href='/about'>О нас</Link>
				</div>
				<div className={cl(cls.Right, {}, [])}>
					<div className={cl(cls.controlButtons, {}, [])}>
						{/* <LangSwitcher /> */}
						<ThemeSwitcher />
					</div>
					<Button variant='clear' className={cls.Links} onClick={onShowModal}>
						Войти
					</Button>
				</div>
			</div>

			{/* {isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)} */}
		</header>
	);
});

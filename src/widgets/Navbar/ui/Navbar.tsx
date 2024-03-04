'use client';

import { useTheme } from '@/app/providers/ThemeProvider';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Logo } from '@/shared/ui/Logo';
import { Loader } from '@/widgets/Loader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Moon from 'public/images/icons/moon.svg';
import { memo } from 'react';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
	blackhole?: boolean;
}

export const Navbar = memo(({ className = '', blackhole }: NavbarProps) => {
	// const authData = useSelector(getUserAuthData);

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

	const t = useTranslations();
	const pathname = usePathname();
	const { theme, toggleTheme } = useTheme();

	const isActive = (href: string) => {
		return pathname === href ? cls.Selected : '';
	};

	return (
		<>
			<header className={cl(cls.Navbar, {}, [className])}>
				{/* {blackhole && (
				<Suspense fallback={null}>
					<video
						autoPlay
						loop
						muted
						playsInline
						className={`${cls.blackhole} noselect`}
					>
						<source src='/videos/blackhole.webm' />
					</video>
				</Suspense>
			)} */}
				<nav className={cl(cls.Content, {}, ['content'])}>
					<nav className={cl(cls.Left, {}, [])}>
						<Link href='/' className={cl(cls.Logo, {}, [])}>
							<Logo />
						</Link>
						<div className={cls.LeftWrapper}>
							<Input
								type='email'
								label='Email'
								placeholder='Поиск...'
								addonLeft={
									<Image
										src='/images/icons/search.svg'
										alt='Иконка поиска'
										width={18}
										height={18}
									/>
								}
							/>
							<Loader />
						</div>
					</nav>
					<nav className={cl(cls.Center, {}, [])}>
						<Link href='/' className={isActive('/')}>
							{t('Navbar.home')}
						</Link>
						<Link href='/about' className={isActive('/about/')}>
							{t('Navbar.about')}
						</Link>
					</nav>
					<nav className={cl(cls.Right, {}, [])}>
						<nav className={cl(cls.controlButtons, {}, [])}>
							<LangSwitcher />
							<Button slice onClick={toggleTheme}>
								<Moon />
							</Button>
							{/* <ThemeSwitcher /> */}
						</nav>
						<Avatar
							border
							src='/images/temp/ava.jpg'
							alt='Иконка пользователя'
						/>
					</nav>
				</nav>

				{/* {isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)} */}
			</header>
			<div className={cls.Spacer} />
		</>
	);
});

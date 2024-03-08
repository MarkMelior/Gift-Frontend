'use client';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Logo } from '@/shared/ui/Logo';
import { Loader } from '@/widgets/Loader';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
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

	const t = useTranslations('Navbar');
	const pathname = usePathname();

	const isActive = (href: string) => {
		return pathname === href ? cls.selected : '';
	};

	return (
		<>
			<header className={cn(cls.navbar, className)}>
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
				<nav className={cn(cls.content, 'content')}>
					<nav className={cls.left}>
						<Link href='/' className={cls.logo}>
							<Logo />
						</Link>
						<div className={cls.leftWrapper}>
							<Input
								type='email'
								label='Email'
								placeholder={t('search')}
								addonLeft={
									<Image
										src='/images/icons/search.svg'
										alt={t('search-icon')}
										width={18}
										height={18}
										className='noselect'
									/>
								}
							/>
							<Loader />
						</div>
					</nav>
					<nav className={cls.center}>
						<Link href='/' className={isActive('/')}>
							{t('home')}
						</Link>
						<Link href='/about' className={isActive('/about/')}>
							{t('about')}
						</Link>
					</nav>
					<nav className={cls.right}>
						<nav className={cls.controlButtons}>
							<LangSwitcher />
							<ThemeSwitcher />
						</nav>
						<Avatar border src='/images/temp/ava.jpg' alt={t('user-logo')} />
					</nav>
				</nav>

				{/* {isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)} */}
			</header>
			<div className={cls.spacer} />
		</>
	);
});

'use client';

/* eslint-disable i18next/no-literal-string */
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Logo } from '@/shared/ui/Logo';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Spinner,
	Tooltip,
} from '@nextui-org/react';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
	blackhole?: boolean;
	shouldHideOnScroll?: boolean;
}

export const Navbar = memo(
	({ className = '', blackhole, shouldHideOnScroll }: NavbarProps) => {
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
		const isMobile = useMediaQuery({ maxWidth: MediaSize.SM });
		const [isScrollingDown, setIsScrollingDown] = useState(true);
		const [prevScrollY, setPrevScrollY] = useState(0);

		useEffect(() => {
			const handleScroll = () => {
				const currentScrollY = window.scrollY;
				setIsScrollingDown(
					currentScrollY < prevScrollY || currentScrollY < 150,
				);
				setPrevScrollY(currentScrollY);
			};

			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}, [prevScrollY]);

		const isActive = useCallback(
			(href: string) => {
				return pathname === href ? cls.selected : '';
			},
			[pathname],
		);

		const renderInput = useMemo(
			() => (
				<Input
					isClearable
					size='sm'
					radius='sm'
					placeholder={t('search')}
					className={cls.input}
					startContent={
						<Image
							src='/images/icons/search.svg'
							alt={t('search-icon')}
							width={18}
							height={18}
							className='noselect'
						/>
					}
				/>
			),
			[t],
		);

		const renderProfile = useMemo(
			() => (
				<Dropdown
					backdrop='opaque'
					placement='bottom-end'
					offset={30}
					className={cls.dropdown}
				>
					<DropdownTrigger>
						<Avatar
							isBordered
							src='/images/temp/ava.jpg'
							alt={t('user-logo')}
						/>
					</DropdownTrigger>
					<DropdownMenu
						variant='faded'
						aria-label='Dropdown menu with description'
					>
						<DropdownSection title='Actions' showDivider>
							<DropdownItem key='new' description='Create a new file'>
								New file
							</DropdownItem>
							<DropdownItem key='copy' description='Copy the file link'>
								Copy link
							</DropdownItem>
							<DropdownItem
								key='edit'
								description='Allows you to edit the file'
							>
								Edit file
							</DropdownItem>
						</DropdownSection>
						<DropdownSection title='Danger zone'>
							<DropdownItem
								key='delete'
								className='text-danger'
								color='danger'
								description='Permanently delete the file'
							>
								Delete file
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			),
			[t],
		);

		const renderLink = useMemo(() => {
			return (
				<>
					<li className={cn(cls.link, isActive('/'))}>
						<Link href='/'>
							{isMobile && (
								<Image
									src='/images/icons/home.svg'
									alt=''
									width={28}
									height={28}
								/>
							)}
							{t('home')}
						</Link>
					</li>
					<li className={cn(cls.link, isActive('/shop/'))}>
						<Link href='/shop'>
							{isMobile && (
								<Image
									src='/images/icons/cart.svg'
									alt=''
									width={28}
									height={28}
								/>
							)}
							{t('shop')}
						</Link>
					</li>
					<MediaQuery maxWidth={MediaSize.SM}>
						<li className={cn(cls.link, isActive('/favorites/'))}>
							<Link href='/favorites'>
								{isMobile && (
									<Image
										src='/images/icons/heart.svg'
										alt=''
										width={28}
										height={28}
									/>
								)}
								{t('favorites')}
							</Link>
						</li>
					</MediaQuery>
				</>
			);
		}, [isActive, isMobile, t]);

		const renderMobile = () => (
			<ul className={cls.mobile}>
				{renderLink}
				<li>{renderProfile}</li>
			</ul>
		);

		const renderDesktop = () => (
			<>
				<div className={cls.left}>
					<Link href='/' className={cls.logo}>
						<Logo />
					</Link>
					{renderInput}
					<MediaQuery minWidth={MediaSize.SM}>
						<Tooltip
							offset={15}
							showArrow
							content='Что-то загружается...'
							className={cls.tooltip}
						>
							<Spinner size='sm' className={cls.spinner} />
						</Tooltip>
					</MediaQuery>
				</div>
				<ul className={cls.center}>{renderLink}</ul>
				<ul className={cls.right}>
					<MediaQuery minWidth={MediaSize.MD}>
						<li className={cls.controlButtons}>
							<LangSwitcher />
							<ThemeSwitcher />
						</li>
					</MediaQuery>
					{renderProfile}
				</ul>
			</>
		);

		const renderSearch = () => {
			return (
				<div
					className={cls.search}
					style={{
						transform: isScrollingDown ? 'translateY(0)' : 'translateY(-100%)',
					}}
				>
					<div className={cn(cls.contentSearch, 'content')}>
						<Link href='/' className={cls.logo}>
							<Logo scale={0.75} />
						</Link>
						{renderInput}
					</div>
				</div>
			);
		};

		return (
			<>
				<header className={cn(cls.wrapper, className)}>
					<nav className={cn(cls.content, 'content')}>
						{isMobile ? renderMobile() : renderDesktop()}
					</nav>
				</header>
				{isMobile && renderSearch()}
				<div className={cls.spacer} />
			</>
		);
	},
);

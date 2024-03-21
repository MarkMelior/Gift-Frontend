'use client';

/* eslint-disable i18next/no-literal-string */
import { SearchIcon } from '@/shared/assets/icon/Search';
import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Logo } from '@/shared/ui/Logo';
import { Tooltip } from '@nextui-org/react';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { DropdownProfile } from '../DropdownProfile/DropdownProfile';
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
		const isPhone = useMediaQuery({ maxWidth: MediaSize.SM });
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
						// <Image
						// 	src='/images/icons/search.svg'
						// 	alt={t('search-icon')}
						// 	width={18}
						// 	height={18}
						// 	className='noselect'
						// />
						<SearchIcon width={18} height={18} />
					}
				/>
			),
			[t],
		);

		const renderProfile = useMemo(
			() => (
				<DropdownProfile>
					<Avatar isBordered src='/images/temp/ava.jpg' alt={t('user-logo')} />
				</DropdownProfile>
			),
			[t],
		);

		const renderLink = useMemo(() => {
			return (
				<>
					<li className={cn(cls.link, isActive('/'))}>
						<Link href='/'>
							{isPhone && (
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
							{isPhone && (
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
					{/* <MediaQuery maxWidth={MediaSize.SM}> */}
					<li className={cn(cls.link, isActive('/favorites/'))}>
						<Link href='/favorites'>
							{isPhone && (
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
					{/* </MediaQuery> */}
				</>
			);
		}, [isActive, isPhone, t]);

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
							<Loader size='sm' className={cls.spinner} />
						</Tooltip>
					</MediaQuery>
				</div>
				<ul className={cls.center}>{renderLink}</ul>
				<ul className={cls.right}>
					<MediaQuery minWidth={MediaSize.MD}>
						<li className={cls.controlButtons}>
							{/* <LangSwitcher /> */}
							{/* <ThemeSwitcher /> */}
							{/* <Link href='/favorites'>
								<Button
									slice
									isIconOnly
									startContent={
										<Badge content={2} size='sm' shape='circle' color='danger'>
											<Heart />
										</Badge>
									}
								/>
							</Link> */}
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
						{isPhone ? renderMobile() : renderDesktop()}
					</nav>
				</header>
				{isPhone && renderSearch()}
				<div className={cls.spacer} />
			</>
		);
	},
);

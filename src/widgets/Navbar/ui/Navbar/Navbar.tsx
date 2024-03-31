'use client';

import { DropdownProfile } from '@/features/DropdownProfile';
import { ModalSearch } from '@/features/Search';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { MediaSize } from '@/shared/const';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';
import { Spinner, Tooltip, useDisclosure } from '@nextui-org/react';
import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
	blackhole?: boolean;
	shouldHideOnScroll?: boolean;
}

export const Navbar = memo(
	({ className, blackhole, shouldHideOnScroll }: NavbarProps) => {
		const pathname = usePathname();
		const isSM = useMediaQuery({ maxWidth: MediaSize.SM });
		const isLG = useMediaQuery({ maxWidth: MediaSize.LG });
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

		const { isOpen, onOpen, onOpenChange } = useDisclosure();

		const renderInput = useMemo(
			() => (
				<>
					<Button
						onClick={onOpen}
						className={cls.searchButton}
						startContent={<SearchIcon width={18} height={18} />}
					>
						Поиск
					</Button>
					<ModalSearch isOpen={isOpen} onOpenChange={onOpenChange} />
				</>
			),
			[isOpen, onOpen, onOpenChange],
		);

		const renderProfile = useMemo(
			() => (
				<DropdownProfile>
					<Avatar
						isBordered
						src='/images/temp/ava.jpg'
						alt='Иконка пользователя'
					/>
				</DropdownProfile>
			),
			[],
		);

		const renderLink = useMemo(() => {
			return (
				<>
					<li className={cn(cls.link, isActive('/'))}>
						<Link href='/'>
							{isLG && (
								<Image
									src='/images/icons/home.svg'
									alt=''
									width={28}
									height={28}
								/>
							)}
							Главная
						</Link>
					</li>
					<li className={cn(cls.link, isActive('/shop/'))}>
						<Link href='/shop'>
							{isLG && (
								<Image
									src='/images/icons/cart.svg'
									alt=''
									width={28}
									height={28}
								/>
							)}
							Магазин
						</Link>
					</li>
					{/* <MediaQuery maxWidth={MediaSize.SM}> */}
					<li className={cn(cls.link, isActive('/favorites/'))}>
						<Link href='/favorites'>
							{isLG && (
								<Image
									src='/images/icons/heart.svg'
									alt=''
									width={28}
									height={28}
								/>
							)}
							Избранное
						</Link>
					</li>
					{/* </MediaQuery> */}
				</>
			);
		}, [isActive, isLG]);

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
							closeDelay={0}
							showArrow
							content='Что-то загружается...'
							className={cls.tooltip}
						>
							<Spinner size='sm' className={cls.spinner} />
						</Tooltip>
					</MediaQuery>
				</div>
				<ul className={cls.center}>{renderLink}</ul>
				<ul className={cls.right}>{renderProfile}</ul>
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
						{isSM ? renderMobile() : renderDesktop()}
					</nav>
				</header>
				{isSM && renderSearch()}
				<div className={cls.spacer} />
			</>
		);
	},
);

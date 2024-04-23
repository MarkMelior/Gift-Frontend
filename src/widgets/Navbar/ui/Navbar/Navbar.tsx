'use client';

import { ModalSearch } from '@/features/search';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { MediaSize, getRouteMain } from '@/shared/const';
import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Logo } from '@/shared/ui/logo';
import { DropdownProfile } from '@/widgets/dropdown-profile';
import { Kbd, Spinner, Tooltip, useDisclosure } from '@nextui-org/react';
import cn from 'clsx';
import Link from 'next/link';
import type { KeyboardEvent } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { NavbarItems } from '../navbar-items/navbar-items';
import cls from './navbar.module.scss';

interface NavbarProps {
	className?: string;
	blackhole?: boolean;
	shouldHideOnScroll?: boolean;
}

export const Navbar = memo(
	({ className, blackhole, shouldHideOnScroll }: NavbarProps) => {
		const isSM = useMediaQuery({ maxWidth: MediaSize.SM });
		const isMD = useMediaQuery({ maxWidth: MediaSize.MD });
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

		const { isOpen, onOpen, onOpenChange } = useDisclosure();

		const handleKeyDown = useCallback(
			(e: KeyboardEvent) => {
				if (e.ctrlKey && ['k', 'л'].includes(e.key)) {
					e.preventDefault();
					onOpenChange();
				}
			},
			[onOpenChange],
		);

		useEffect(() => {
			// @ts-ignore fix
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				// @ts-ignore fix
				document.removeEventListener('keydown', handleKeyDown);
			};
		}, [handleKeyDown]);

		const renderInput = useMemo(
			() => (
				<>
					<Button
						onClick={onOpen}
						className={cls.searchButton}
						startContent={<SearchIcon width={18} height={18} />}
					>
						Поиск
						{!isMD && <Kbd keys={['ctrl']}>K</Kbd>}
					</Button>
					<ModalSearch isOpen={isOpen} onOpenChange={onOpenChange} />
				</>
			),
			[isMD, isOpen, onOpen, onOpenChange],
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

		const renderMobile = () => (
			<ul className={cls.mobile}>
				<NavbarItems />
				<li>{renderProfile}</li>
			</ul>
		);

		const renderDesktop = () => (
			<>
				<div className={cls.left}>
					<Link href={getRouteMain()} className={cls.logo}>
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
				<ul className={cls.center}>
					<NavbarItems />
				</ul>
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
						<Link href={getRouteMain()} className={cls.logo}>
							<Logo scale={0.75} />
						</Link>
						{renderInput}
					</div>
				</div>
			);
		};

		const [isMounted, setMounted] = useState(false);

		useEffect(() => {
			setMounted(true);
		}, []);

		return (
			<>
				<header className={cn(cls.wrapper, className)}>
					<nav className={cn(cls.content, 'content')}>
						{isSM && isMounted ? renderMobile() : isMounted && renderDesktop()}
					</nav>
				</header>
				{isSM && isMounted && renderSearch()}
				<div className={cls.spacer} />
			</>
		);
	},
);

'use client';

import { DropdownProfile } from '@/features/DropdownProfile';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { MediaSize } from '@/shared/const';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { Logo } from '@/shared/ui/Logo';
import { Tooltip, useDisclosure } from '@nextui-org/react';
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

		const isActive = useCallback((href: string) => {
			return pathname === href ? cls.selected : '';
		}, []);

		const [isSearch, setIsSearch] = useState(false);
		const { onOpenChange } = useDisclosure();

		const renderInput = useMemo(
			() => (
				<>
					<Input
						isClearable
						size='sm'
						radius='sm'
						placeholder='Поиск'
						className={cls.input}
						onFocus={() => {
							setIsSearch(true);
						}}
						startContent={<SearchIcon width={18} height={18} />}
					/>
					{/* <Modal
						isOpen={isSearch}
						onClose={() => setIsSearch(false)}
						onOpenChange={onOpenChange}
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className='flex flex-col gap-1'>
										Modal Title
									</ModalHeader>
									<ModalBody>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Nullam pulvinar risus non risus hendrerit venenatis.
											Pellentesque sit amet hendrerit risus, sed porttitor quam.
										</p>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Nullam pulvinar risus non risus hendrerit venenatis.
											Pellentesque sit amet hendrerit risus, sed porttitor quam.
										</p>
										<p>
											Magna exercitation reprehenderit magna aute tempor
											cupidatat consequat elit dolor adipisicing. Mollit dolor
											eiusmod sunt ex incididunt cillum quis. Velit duis sit
											officia eiusmod Lorem aliqua enim laboris do dolor
											eiusmod. Et mollit incididunt nisi consectetur esse
											laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
											deserunt nostrud ad veniam.
										</p>
									</ModalBody>
									<ModalFooter>
										<Button color='danger' variant='light' onPress={onClose}>
											Close
										</Button>
										<Button color='primary' onPress={onClose}>
											Action
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal> */}
				</>
			),
			[],
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
							{isPhone && (
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
							{isPhone && (
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
							{isPhone && (
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
		}, [isActive, isPhone]);

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
						{isPhone ? renderMobile() : renderDesktop()}
					</nav>
				</header>
				{isPhone && renderSearch()}
				<div className={cls.spacer} />
			</>
		);
	},
);

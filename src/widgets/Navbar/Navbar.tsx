'use client';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Link, usePathname } from '@/shared/config/i18n/navigation';
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
import { memo } from 'react';
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

		const isActive = (href: string) => {
			return pathname === href ? cls.selected : '';
		};

		return (
			<>
				<header className={cn(cls.navbar, className)}>
					<nav className={cn(cls.content, 'content')}>
						<ul className={cls.left}>
							<li>
								<Link href='/' className={cls.logo}>
									<Logo />
								</Link>
							</li>

							<li className={cls.leftWrapper}>
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
								<Tooltip
									offset={15}
									showArrow
									content='Что-то загружается...'
									className={cls.tooltip}
								>
									<Spinner size='sm' className={cls.spinner} />
								</Tooltip>
							</li>
						</ul>
						<ul className={cls.center}>
							<li>
								<Link href='/' className={isActive('/')}>
									{t('home')}
								</Link>
							</li>
							<li>
								<Link href='/about' className={isActive('/about/')}>
									{t('about')}
								</Link>
							</li>
						</ul>
						<ul className={cls.right}>
							<li className={cls.controlButtons}>
								<LangSwitcher />
								<ThemeSwitcher />
							</li>

							{/* <Popover
							shouldBlockScroll
							backdrop='opaque'
							placement='bottom-end'
							offset={30}
						>
							<PopoverTrigger>
								<Avatar
									isBordered
									color='success'
									src='/images/temp/ava.jpg'
									alt={t('user-logo')}
								/>
							</PopoverTrigger>
							<PopoverContent>
								<div className='px-1 py-2'>
									<div className='text-small font-bold'>Popover Content</div>
									<div className='text-tiny'>This is the popover content</div>
								</div>
							</PopoverContent>
						</Popover> */}
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
						</ul>
					</nav>
				</header>
				<div className={cls.spacer} />
			</>
		);
	},
);

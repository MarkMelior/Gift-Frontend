'use client';

import { getUserAuthData, getUserState } from '@/entities/User';
import { ModalAuth, useAuth } from '@/features/Auth';
import { getSettings, settingsActions } from '@/features/settings';
import { MoonIcon } from '@/shared/assets/icon/Moon';
import { SunIcon } from '@/shared/assets/icon/Sun';
import { MediaSize } from '@/shared/const';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Theme } from '@/shared/types/theme';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Skeleton,
	Switch,
	User,
	useDisclosure,
} from '@nextui-org/react';
import cn from 'clsx';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import cls from './dropdown-profile.module.scss';

interface DropdownProfileProps {
	children?: ReactNode;
}

export const DropdownProfile: FC<DropdownProfileProps> = ({ children }) => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === Theme.DARK;
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });

	const dispatch = useAppDispatch();
	const { onUserLogout } = useAuth();
	const authData = useSelector(getUserAuthData);
	const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useSelector(getUserState);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const {
		isOpen: isOpenAuthModal,
		onOpen: onOpenAuthModal,
		onOpenChange: onOpenChangeAuthModal,
	} = useDisclosure();

	const {
		currency: isUSD,
		optimization: isOptimization,
		space: isSpace,
	} = useSelector(getSettings);

	const isSpaceAllowed = !isMD && isDark && !isOptimization;

	return (
		<>
			<Dropdown
				backdrop={'opaque'}
				placement='bottom-end'
				offset={30}
				className={cls.dropdown}
				isOpen={isOpen}
				onOpenChange={() => setIsOpen(!isOpen)}
				closeOnSelect={false}
			>
				<DropdownTrigger>{children}</DropdownTrigger>
				<DropdownMenu
					variant='faded'
					aria-label='Dropdown menu with description'
				>
					<DropdownSection title='Настройки' showDivider>
						<DropdownItem
							key='space'
							description={
								isMD ? 'Не работает на мобильных' : 'Добавить космос!'
							}
							onClick={() => {
								dispatch(settingsActions.toggleSpace());
							}}
							startContent={
								<Switch
									size='sm'
									aria-label='Automatic updates'
									isDisabled={!isSpaceAllowed}
									isSelected={isSpace && isSpaceAllowed}
									className={cn(cls.switch, 'noselect')}
								/>
							}
						>
							Космический фон
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
							}}
							key='theme'
							description='Сделать тему светлой'
							startContent={
								<Switch
									size='sm'
									aria-label='Automatic updates'
									isSelected={theme === Theme.LIGHT}
									className={cn(cls.switch, 'noselect')}
									startContent={<MoonIcon />}
									endContent={<SunIcon />}
								/>
							}
						>
							Светлая тема
						</DropdownItem>
						<DropdownItem
							key='optimization'
							description='Убрать все эффекты'
							onClick={() => {
								dispatch(settingsActions.toggleOptimization());
							}}
							startContent={
								<Switch
									size='sm'
									aria-label='Automatic updates'
									className={cn(cls.switch, 'noselect')}
									isSelected={isOptimization}
								/>
							}
						>
							Оптимизация
						</DropdownItem>
						<DropdownItem
							key='usd'
							description='Отображать цены в $'
							onClick={() => {
								if (isUSD === 'USD') {
									dispatch(settingsActions.changeCurrency('RUB'));
								} else {
									dispatch(settingsActions.changeCurrency('USD'));
								}
							}}
							startContent={
								<Switch
									size='sm'
									aria-label='Automatic updates'
									isSelected={isUSD === 'USD'}
									className={cn(cls.switch, 'noselect')}
								/>
							}
						>
							Доллары
						</DropdownItem>
					</DropdownSection>
					{authData ? (
						<DropdownSection title='Аккаунт'>
							<DropdownItem
								as={Link}
								href='/profile'
								key='profile'
								className='opacity-100'
								onClick={() => setIsOpen(false)}
							>
								{isLoadingUser || !user ? (
									<div className='max-w-[300px] w-full flex items-center gap-2'>
										<div>
											<Skeleton className='flex rounded-full w-10 h-10' />
										</div>
										<div className='w-full flex flex-col gap-2'>
											<Skeleton className='h-2.5 w-2/5 rounded-lg' />
											<Skeleton className='h-2.5 w-3/5 rounded-lg' />
										</div>
									</div>
								) : (
									<User
										name={user?.username}
										description={user?.email}
										avatarProps={{
											src: `${process.env.UPLOADS}/avatars/${user?.id}/${user?.avatar}`,
										}}
									/>
								)}
							</DropdownItem>
							<DropdownItem
								key='delete'
								className='text-danger'
								color='danger'
								onClick={onUserLogout}
							>
								Выйти с аккаунта
							</DropdownItem>
						</DropdownSection>
					) : (
						<DropdownSection title='Аккаунт'>
							<DropdownItem
								key='login'
								onClick={() => {
									setIsOpen(false);
									onOpenAuthModal();
								}}
							>
								Войти в аккаунт
							</DropdownItem>
						</DropdownSection>
					)}
				</DropdownMenu>
			</Dropdown>

			<ModalAuth
				isOpen={isOpenAuthModal}
				onOpenChange={onOpenChangeAuthModal}
			/>
		</>
	);
};

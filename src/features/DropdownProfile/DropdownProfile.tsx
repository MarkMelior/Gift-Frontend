'use client';

import { getUserAuthData, userActions } from '@/entities/User';
import { ModalLogin } from '@/features/Auth';
import {
	getSettingsCurrency,
	getSettingsOptimization,
	getSettingsSpace,
	settingsActions,
} from '@/features/Settings';
import { MoonIcon } from '@/shared/assets/icon/Moon';
import { SunIcon } from '@/shared/assets/icon/Sun';
import { MediaSize } from '@/shared/const';
import { Theme } from '@/shared/types/theme';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Switch,
	User,
	useDisclosure,
} from '@nextui-org/react';
import cn from 'clsx';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import cls from './DropdownProfile.module.scss';

interface DropdownProfileProps {
	children?: ReactNode;
}

export const DropdownProfile: FC<DropdownProfileProps> = ({ children }) => {
	const { theme, setTheme } = useTheme();
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });
	const {
		isOpen: isOpenModal,
		onOpen: onOpenModal,
		onOpenChange: onOpenChangeModal,
	} = useDisclosure();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dispatch = useDispatch();

	const isOptimization = useSelector(getSettingsOptimization);
	const isSpace = useSelector(getSettingsSpace);
	const isUSD = useSelector(getSettingsCurrency);

	const authData = useSelector(getUserAuthData);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

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
					// disabledKeys={['profile']}
					variant='faded'
					aria-label='Dropdown menu with description'
				>
					<DropdownSection title='Настройки' showDivider>
						<DropdownItem
							key='space'
							description={
								isMD ? 'Не работает на мобильных' : 'Добавляет космос!'
							}
							onClick={() => {
								dispatch(settingsActions.toggleSpace());
							}}
							startContent={
								<Switch
									size='sm'
									aria-label='Automatic updates'
									isSelected={isSpace}
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
							description='Делает тему светлой'
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
							description='Убирает все эффекты'
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
							description='Отображает цены в $'
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
								href={`/@${'MarkMelior'}`}
								key='profile'
								className='opacity-100'
								onClick={() => setIsOpen(false)}
							>
								<User
									name='Mark Melior'
									description='mark.melior@yandex.com'
									avatarProps={{
										src: '/images/temp/ava.jpg',
									}}
								/>
							</DropdownItem>
							<DropdownItem
								key='delete'
								className='text-danger'
								color='danger'
								onClick={onLogout}
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
									onOpenModal();
								}}
							>
								Войти в аккаунт
							</DropdownItem>
						</DropdownSection>
					)}
				</DropdownMenu>
			</Dropdown>
			<ModalLogin isOpen={isOpenModal} onOpenChange={onOpenChangeModal} />
		</>
	);
};

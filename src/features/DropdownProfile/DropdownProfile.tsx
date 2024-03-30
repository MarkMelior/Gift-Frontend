'use client';

import { getSettings, settingsActions } from '@/app/providers/StoreProvider';
import { getUserAuthData, userActions } from '@/entities/User';
import { ModalLogin } from '@/features/Auth';
import { MoonIcon } from '@/shared/assets/icon/Moon';
import { SunIcon } from '@/shared/assets/icon/Sun';
import { MediaSize } from '@/shared/const';
import { Currency } from '@/shared/types/localization';
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

	const isOptimization = useSelector(getSettings('optimization'));
	const isSpace = useSelector(getSettings('space'));
	const isUSD = useSelector(getSettings<Currency>('currency'));

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
					disabledKeys={['profile']}
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
								dispatch(settingsActions.toggle('space'));
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
								dispatch(settingsActions.toggle('optimization'));
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
							<DropdownItem isReadOnly key='profile' className='opacity-100'>
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
								closeOnSelect
								onClick={onLogout}
							>
								Выйти с аккаунта
							</DropdownItem>
						</DropdownSection>
					) : (
						<DropdownSection title='Аккаунт'>
							<DropdownItem
								key='login'
								closeOnSelect
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

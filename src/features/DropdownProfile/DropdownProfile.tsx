'use client';

import { getSettings, settingsSlice } from '@/app/providers/StoreProvider';
import { MoonIcon } from '@/shared/assets/icon/Moon';
import { SunIcon } from '@/shared/assets/icon/Sun';
import { MediaSize } from '@/shared/const';
import { Theme } from '@/shared/types/theme';
import { ModalLogin } from '@/widgets/Modal';
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
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import cls from './DropdownProfile.module.scss';

interface DropdownProfileProps {
	children?: ReactNode;
}

export const DropdownProfile: FC<DropdownProfileProps> = ({ children }) => {
	const { theme, setTheme } = useTheme();
	const isPhone = useMediaQuery({ maxWidth: MediaSize.SM });
	const pathname = usePathname();
	const {
		isOpen: isOpenModal,
		onOpen: onOpenModal,
		onOpenChange: onOpenChangeModal,
	} = useDisclosure();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const isEffects = useSelector(getSettings('effects'));
	const isAnimations = useSelector(getSettings('animations'));
	const isSpace = useSelector(getSettings('space'));
	const isUSD = useSelector(getSettings('currency'));
	const dispatch = useDispatch();

	const renderOptimizationSettings = () => {
		return (
			<DropdownSection title='Оптимизация' showDivider>
				<DropdownItem
					key='space'
					description='Добавляет анимацию космоса'
					onClick={() => {
						dispatch(settingsSlice.actions.toggle('space'));
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
					key='edit'
					description='Например эффект нажатия'
					onClick={() => {
						dispatch(settingsSlice.actions.toggle('effects'));
					}}
					startContent={
						<Switch
							size='sm'
							aria-label='Automatic updates'
							className={cn(cls.switch, 'noselect')}
							isSelected={isEffects}
						/>
					}
				>
					Эффекты
				</DropdownItem>
				<DropdownItem
					key='edit'
					description='Например видео'
					onClick={() => {
						dispatch(settingsSlice.actions.toggle('animations'));
					}}
					startContent={
						<Switch
							size='sm'
							aria-label='Automatic updates'
							className={cn(cls.switch, 'noselect')}
							isSelected={isAnimations}
						/>
					}
				>
					Анимации
				</DropdownItem>
			</DropdownSection>
		);
	};

	return (
		<>
			<Dropdown
				backdrop='opaque'
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
									// className='noselect'
									className={cn(cls.switch, 'noselect')}
									startContent={<MoonIcon />}
									endContent={<SunIcon />}
								/>
							}
						>
							Светлая тема
						</DropdownItem>
						<DropdownItem
							key='usd'
							description='Отображать цены в USD'
							onClick={() => {
								if (isUSD === 'USD') {
									dispatch(settingsSlice.actions.changeCurrency('RUB'));
								} else {
									dispatch(settingsSlice.actions.changeCurrency('USD'));
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
					{!isPhone && renderOptimizationSettings()}
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
						>
							Выйти с аккаунта
						</DropdownItem>
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
				</DropdownMenu>
			</Dropdown>
			<ModalLogin isOpen={isOpenModal} onOpenChange={onOpenChangeModal} />
		</>
	);
};

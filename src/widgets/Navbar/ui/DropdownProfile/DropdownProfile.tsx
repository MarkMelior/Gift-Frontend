'use client';

/* eslint-disable i18next/no-literal-string */
import { getSettings, settingsSlice } from '@/app/providers/StoreProvider';
import { MoonIcon } from '@/shared/assets/icon/Moon';
import { SunIcon } from '@/shared/assets/icon/Sun';
import { Link, usePathname } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { Theme } from '@/shared/const/theme';
import { ModalLogin } from '@/widgets/Modal';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Switch,
	useDisclosure,
} from '@nextui-org/react';
import cn from 'clsx';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
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
	const locale = useLocale();
	const otherLocale = locale === 'en' ? 'ru' : 'en';
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
							className={cls.dropdownItem}
							key='new'
							description='Английский язык'
							startContent={
								<Switch
									size='sm'
									aria-label='Automatic updates'
									isSelected={locale === 'en'}
									className={cn(cls.switch, 'noselect')}
								/>
							}
						>
							<Link
								href={pathname}
								locale={otherLocale}
								className={cls.langSwitcher}
							/>
							English
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
									// className='noselect'
									className={cn(cls.switch, 'noselect')}
									startContent={<MoonIcon />}
									endContent={<SunIcon />}
								/>
							}
						>
							Светлая тема
						</DropdownItem>
					</DropdownSection>
					{!isPhone && renderOptimizationSettings()}
					<DropdownSection title='Аккаунт'>
						{/* <DropdownItem isReadOnly key='profile' className='opacity-100'>
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
    </DropdownItem> */}
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

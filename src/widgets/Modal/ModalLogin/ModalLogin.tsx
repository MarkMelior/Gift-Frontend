'use client';

/* eslint-disable i18next/no-literal-string */
import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { UserIcon } from '@/shared/assets/icon/User';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tab,
	Tabs,
} from '@nextui-org/react';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';
import cls from './ModalLogin.module.scss';

interface ModalLoginProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	register?: boolean;
}

export const ModalLogin: FC<ModalLoginProps> = ({
	isOpen,
	onOpenChange,
	register = false,
}) => {
	// const t = useTranslations('ModalLogin');
	const [registration, setRegistration] = useState<string | number>(
		register ? 'sign-up' : 'login',
	);

	const renderLogin = useMemo(() => {
		return (
			<Tab key='login' title='Вход' className={cls.tab}>
				<form>
					<Input
						autoFocus
						startContent={<MailIcon />}
						placeholder='Введите Email'
						variant='bordered'
					/>
					<Input
						startContent={<PasswordIcon />}
						placeholder='Введите пароль'
						type='password'
						variant='bordered'
					/>
					<div className='flex py-2 px-1 justify-between'>
						<Checkbox
							classNames={{
								label: 'text-small',
							}}
						>
							Запомните меня
							{/* Remember me */}
						</Checkbox>
						<Button clear disableRipple className={cls.button}>
							Забыли пароль?
						</Button>
					</div>
				</form>
			</Tab>
		);
	}, []);

	const renderRegister = useMemo(() => {
		return (
			<Tab key='sign-up' title='Регистрация' className={cls.tab}>
				<form>
					<Input
						autoFocus
						startContent={<UserIcon />}
						placeholder='Придумайте имя'
						variant='bordered'
					/>
					<Input
						startContent={<MailIcon />}
						placeholder='Введите Email'
						variant='bordered'
					/>
					<Input
						startContent={<PasswordIcon />}
						placeholder='Введите пароль'
						type='password'
						variant='bordered'
					/>
					<Input
						startContent={<PasswordIcon />}
						placeholder='Повторите пароль'
						type='password'
						variant='bordered'
					/>
				</form>
			</Tab>
		);
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='center'
			className={cls.wrapper}
		>
			<ModalContent>
				{(onClose) => (
					<div className={cls.modal}>
						<ModalHeader className={cls.header}>
							<Image
								src='/images/icons/logo-melior-white.svg'
								width={24}
								height={24}
								alt='test'
							/>
							{registration === 'sign-up' ? 'Регистрация' : 'Вход'}
						</ModalHeader>
						<ModalBody className={cls.body}>
							<Tabs
								fullWidth
								size='md'
								aria-label='Tabs form'
								selectedKey={registration}
								onSelectionChange={setRegistration}
								className={cls.tabs}
							>
								{renderRegister}
								{renderLogin}
							</Tabs>
						</ModalBody>
						<ModalFooter>
							<Button
								customVariant='layer'
								className='py-3 px-8 rounded-xl'
								hoverColor='147, 197, 253'
								starlight
								onPress={onClose}
								// startContent={
								// 	<Image
								// 		src='/images/icons/logo-melior-white.svg'
								// 		width={24}
								// 		height={24}
								// 		alt='test'
								// 	/>
								// }
							>
								{registration === 'sign-up' ? 'Создать аккаунт' : 'Войти'}
							</Button>
						</ModalFooter>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
};

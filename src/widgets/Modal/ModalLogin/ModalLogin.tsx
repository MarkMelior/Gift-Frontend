'use client';

/* eslint-disable i18next/no-literal-string */
import { LockIcon } from '@/shared/assets/icon/Lock';
import { MailIcon } from '@/shared/assets/icon/Mail';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
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
	const [registration, setRegistration] = useState<boolean>(register);

	const renderLogin = useMemo(() => {
		return (
			<>
				<Input
					autoFocus
					endContent={
						<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
					}
					label='Email'
					placeholder='Введите вашу почту' // Enter your email
					variant='bordered'
				/>
				<Input
					endContent={
						<LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
					}
					label='Пароль' // Password
					placeholder='Введите пароль' // Enter your password
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
			</>
		);
	}, []);

	const renderRegister = useMemo(() => {
		return (
			<>
				<Input
					autoFocus
					label='Логин'
					placeholder='Придумайте имя'
					variant='bordered'
				/>
				<Input
					autoFocus
					endContent={
						<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
					}
					label='Email'
					placeholder='Введите вашу почту'
					variant='bordered'
				/>
				<Input
					endContent={
						<LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
					}
					label='Пароль'
					placeholder='Придумайте пароль'
					type='password'
					variant='bordered'
				/>
				<Input
					label='Подтверждение пароля'
					placeholder='Повторите пароль'
					type='password'
					variant='bordered'
				/>
			</>
		);
	}, []);

	const toggleRegistration = () => {
		setRegistration(!registration);
	};

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
							{registration ? 'Регистрация' : 'Войти в Easy Gift'}
							<Button
								clear
								disableRipple
								className={cls.button}
								onClick={toggleRegistration}
							>
								{registration ? 'Войти' : 'Создать аккаунт'}
							</Button>
						</ModalHeader>
						<ModalBody>{registration ? renderRegister : renderLogin}</ModalBody>
						<ModalFooter>
							<Button
								customVariant='layer'
								className='py-4 px-8 rounded-xl'
								color='primary'
								onPress={onClose}
								startContent={
									<Image
										src='/images/icons/logo-melior-white.svg'
										width={24}
										height={24}
										alt='test'
									/>
								}
							>
								{registration ? 'Создать аккаунт' : 'Войти'}
							</Button>
						</ModalFooter>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
};

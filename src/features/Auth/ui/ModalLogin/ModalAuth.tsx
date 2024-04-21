'use client';

import { Notification } from '@/entities/Notification';
import { CheckIcon } from '@/shared/assets/icon/Check';
import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { UserIcon } from '@/shared/assets/icon/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tab,
	Tabs,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLoginState } from '../../model/selector/getLoginState/getLoginState';
import { loginByEmail } from '../../model/service/loginByEmail/loginByEmail';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './ModalAuth.module.scss';

export interface ModalLoginProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const ModalLogin: FC<ModalLoginProps> = ({ isOpen, onOpenChange }) => {
	const searchParams = useSearchParams();
	const isRegistration = searchParams.get('state') === 'sign-up';

	const dispatch = useAppDispatch();
	const { password, email, error, isLoading } =
		useSelector(getLoginState) || {};

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setEmail(value));
		},
		[dispatch],
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch],
	);

	const [showNotification, setShowNotification] = useState(false);

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByEmail({ email, password }));

		if (result.meta.requestStatus === 'fulfilled') {
			onOpenChange(false);
			setShowNotification(true);
			// store.reducerManager.remove('loginForm');
			// dispatch({ type: `@DESTROY loginForm reducer` });
		}
	}, [dispatch, email, onOpenChange, password]);

	const renderLogin = useMemo(() => {
		return (
			<Tab
				as={Link}
				// @ts-ignore
				scroll={false}
				href={'?state=login'}
				key='login'
				title='Вход'
				className={cls.tab}
			>
				<form>
					<Input
						autoFocus
						startContent={<MailIcon />}
						type='text'
						placeholder='Введите email'
						variant='bordered'
						onChange={(e) => {
							onChangeUsername(e.target.value);
						}}
						value={email}
					/>
					<Input
						startContent={<PasswordIcon />}
						placeholder='Введите пароль'
						type='password'
						variant='bordered'
						onChange={(e) => {
							onChangePassword(e.target.value);
						}}
						value={password}
					/>
					{/* <div className='flex py-2 px-1 justify-between'>
						<Checkbox
							classNames={{
								label: 'text-small',
							}}
						>
							Запомните меня
						</Checkbox>
						<Button clear disableRipple className={cls.button}>
							Забыли пароль?
						</Button>
					</div> */}
				</form>
			</Tab>
		);
	}, [email, password, onChangeUsername, onChangePassword]);

	const renderRegister = useMemo(() => {
		return (
			<Tab
				as={Link}
				// @ts-ignore
				scroll={false}
				href={'?state=sign-up'}
				key='sign-up'
				title='Регистрация'
				className={cls.tab}
			>
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

	const pathname = usePathname();

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement='center'
				className={cls.wrapper}
				onClose={() => {
					window.history.replaceState(null, '', pathname);
				}}
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
								{isRegistration ? 'Регистрация' : 'Вход'}
							</ModalHeader>
							<ModalBody className={cls.body}>
								{error && <div>{error}</div>}
								<Tabs
									fullWidth
									size='md'
									aria-label='Tabs form'
									selectedKey={searchParams.get('state') || 'login'}
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
									// onPress={onClose}
									onClick={onLoginClick}
									isLoading={isLoading}
								>
									{isRegistration ? 'Создать аккаунт' : 'Войти'}
								</Button>
							</ModalFooter>
						</div>
					)}
				</ModalContent>
			</Modal>
			{showNotification && (
				<Notification
					message={`${email}, вы успешно авторизовались!`}
					duration={5000}
					placement='top'
					onClose={() => setShowNotification(false)}
					closeOnClick
					startContent={
						<CheckIcon
							width={16}
							height={16}
							color='hsl(var(--gift-success))'
							isSelected
						/>
					}
				/>
			)}
		</DynamicModuleLoader>
	);
};

export default ModalLogin;

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
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from '../../model/selector/getLoginState';
import { loginByUsername } from '../../model/service/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './ModalLogin.module.scss';

interface ModalLoginProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ModalLogin: FC<ModalLoginProps> = memo(
	({ isOpen, onOpenChange }) => {
		const searchParams = useSearchParams();
		const isRegistration = searchParams.get('state') === 'sign-up';

		const dispatch = useDispatch();
		const { password, username, error, isLoading } =
			useSelector(getLoginState) || {};

		const onChangeUsername = useCallback(
			(value: string) => {
				dispatch(loginActions.setUsername(value));
			},
			[dispatch],
		);

		const onChangePassword = useCallback(
			(value: string) => {
				dispatch(loginActions.setPassword(value));
			},
			[dispatch],
		);

		const onLoginClick = useCallback(() => {
			// @ts-ignore
			dispatch(loginByUsername({ username, password }));
		}, [dispatch, password, username]);

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
							placeholder='Введите логин'
							variant='bordered'
							onChange={(e) => {
								onChangeUsername(e.target.value);
							}}
							value={username}
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
						<div className='flex py-2 px-1 justify-between'>
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
						</div>
					</form>
				</Tab>
			);
		}, [username, password, onChangeUsername, onChangePassword]);

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
		);
	},
);

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
import { FC, useMemo } from 'react';
import cls from './ModalLogin.module.scss';

interface ModalLoginProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	register?: boolean;
}

export const ModalLogin: FC<ModalLoginProps> = ({ isOpen, onOpenChange }) => {
	const searchParams = useSearchParams();
	const isRegistration = searchParams.get('state') === 'sign-up';

	// const hrefSearchParams = (state: 'login' | 'sign-up') => {
	// 	const getSearchParams = new URLSearchParams(searchParams.toString());
	// 	const stringSearchParams = getSearchParams.toString();

	// 	console.log(stringSearchParams);

	// 	if (
	// 		stringSearchParams.length > 0 &&
	// 		!stringSearchParams.includes('state')
	// 	) {
	// 		return `?${stringSearchParams}&state=${state}`;
	// 	}

	// 	return `?state=${state}`;
	// };

	const renderLogin = useMemo(() => {
		return (
			<Tab
				as={Link}
				// @ts-ignore
				scroll={false}
				// href={hrefSearchParams('login')}
				href={'?state=login'}
				key='login'
				title='Вход'
				className={cls.tab}
			>
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
			<Tab
				as={Link}
				// @ts-ignore
				scroll={false}
				href={'?state=sign-up'}
				// href={hrefSearchParams('sign-up')}
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
								onPress={onClose}
							>
								{isRegistration ? 'Создать аккаунт' : 'Войти'}
							</Button>
						</ModalFooter>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
};

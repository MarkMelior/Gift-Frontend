'use client';

import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { UserIcon } from '@/shared/assets/icon/User';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FC, memo, useCallback } from 'react';
import { userRegister } from '../../model/service/user-register';

export const ModalFormRegister: FC = memo(() => {
	const dispatch = useAppDispatch();

	const handleRegister = useCallback(async () => {
		const result = await dispatch(userRegister({ login, password }));

		// if (result.meta.requestStatus === 'fulfilled') {
		// 	onOpenChange(false);
		// 	setShowNotification(true);
		// }
	}, [dispatch]);

	return (
		<form onSubmit={handleRegister}>
			<Input
				autoFocus
				startContent={<UserIcon />}
				placeholder='Придумайте логин'
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
			<Button
				customVariant='layer'
				className='py-3 px-8 rounded-xl'
				hoverColor='147, 197, 253'
				starlight
				type='submit'
			>
				Создать аккаунт
			</Button>
		</form>
	);
});

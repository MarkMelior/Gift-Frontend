'use client';

import { ReduxStoreWithManager } from '@/app/store';
import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { UserIcon } from '@/shared/assets/icon/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { AuthRegisterRequest } from '@melior-gift/zod-contracts';
import { FC, FormEvent, memo, useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRegisterUserMutation } from '../../api/auth.api';
import { getRegisterFormData } from '../../model/selectors/getRegisterFormData';
import {
	registerFormActions,
	registerFormReducer,
} from '../../model/slice/register-form.slice';
import cls from './modal-auth.module.scss';

interface ModalFormRegisterProps {
	onSubmit: () => void;
}

const reducers: ReducersList = {
	registerForm: registerFormReducer,
};

export const ModalFormRegister: FC<ModalFormRegisterProps> = memo(
	({ onSubmit }) => {
		const dispatch = useAppDispatch();
		const { reducerManager } = useStore() as ReduxStoreWithManager;
		const formData = useSelector(getRegisterFormData);
		const [registerUser] = useRegisterUserMutation();

		const handleFulfilledResult = useCallback(() => {
			onSubmit();
			reducerManager.remove('loginForm');
			reducerManager.remove('registerForm');
			dispatch({ type: `@DESTROY loginForm and registerForm reducer` });
		}, [dispatch, onSubmit, reducerManager]);

		const handleRejectedResult = useCallback(
			(payload: AuthRegisterRequest) => {
				if (typeof payload === 'string') {
					dispatch(registerFormActions.setError(payload));
				} else {
					const { username, password, email } = payload;

					dispatch(registerFormActions.setUsernameError(username));
					dispatch(registerFormActions.setPasswordError(password));
					dispatch(registerFormActions.setEmailError(email));
				}
			},
			[dispatch],
		);

		const handleRegister = useCallback(
			async (e: FormEvent) => {
				e.preventDefault();

				try {
					const { username, password, email } = formData;
					await registerUser({ username, password, email }).unwrap();
					handleFulfilledResult();
				} catch (error: any) {
					handleRejectedResult(error.data.message);
				}
			},
			[formData, handleFulfilledResult, handleRejectedResult, registerUser],
		);

		return (
			<DynamicModuleLoader reducers={reducers}>
				{formData.error && <div className={cls.error}>{formData.error}</div>}
				<form onSubmit={handleRegister}>
					<Input
						name='username'
						autoFocus
						startContent={<UserIcon />}
						placeholder='Придумайте логин'
						variant='bordered'
						isInvalid={!!formData.usernameError}
						errorMessage={formData.usernameError}
						value={formData.username}
						onChange={(e) => {
							dispatch(registerFormActions.setUsername(e.target.value));
							dispatch(registerFormActions.setUsernameError(''));
							dispatch(registerFormActions.setError(''));
						}}
					/>
					<Input
						name='email'
						startContent={<MailIcon />}
						placeholder='Введите Email'
						variant='bordered'
						isInvalid={!!formData.emailError}
						errorMessage={formData.emailError}
						value={formData.email}
						onChange={(e) => {
							dispatch(registerFormActions.setEmail(e.target.value));
							dispatch(registerFormActions.setEmailError(''));
							dispatch(registerFormActions.setError(''));
						}}
					/>
					<Input
						name='password'
						startContent={<PasswordIcon />}
						placeholder='Введите пароль'
						type='password'
						variant='bordered'
						isInvalid={!!formData.passwordError}
						errorMessage={formData.passwordError}
						value={formData.password}
						onChange={(e) => {
							dispatch(registerFormActions.setPassword(e.target.value));
							dispatch(registerFormActions.setPasswordError(''));
							dispatch(registerFormActions.setError(''));
						}}
					/>
					<Input
						name='password2'
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
			</DynamicModuleLoader>
		);
	},
);

'use client';

import { ReduxStoreWithManager } from '@/app/store';
import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { AuthLoginRequest } from '@melior-gift/zod-contracts';
import { FC, FormEvent, useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useLoginUserMutation } from '../../api/auth.api';
import { getLoginFormData } from '../../model/selectors/getLoginFormData';
import {
	loginFormActions,
	loginFormReducer,
} from '../../model/slice/login-form.slice';
import cls from './modal-auth.module.scss';

interface ModalFormLoginProps {
	onSubmit: () => void;
}

const reducers: ReducersList = {
	loginForm: loginFormReducer,
};

export const ModalFormLogin: FC<ModalFormLoginProps> = ({ onSubmit }) => {
	const dispatch = useAppDispatch();
	const { reducerManager } = useStore() as ReduxStoreWithManager;
	const formData = useSelector(getLoginFormData);

	const [loginUser] = useLoginUserMutation();

	const handleFulfilledResult = useCallback(() => {
		onSubmit();
		reducerManager.remove('loginForm');
		reducerManager.remove('registerForm');
		dispatch({ type: `@DESTROY loginForm and registerForm reducer` });
	}, [dispatch, onSubmit, reducerManager]);

	const handleRejectedResult = useCallback(
		(payload: AuthLoginRequest) => {
			if (typeof payload === 'string') {
				dispatch(loginFormActions.setError(payload));
			} else {
				const { login, password } = payload;

				dispatch(loginFormActions.setLoginError(login));
				dispatch(loginFormActions.setPasswordError(password));
			}
		},
		[dispatch],
	);

	const handleLogin = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			try {
				const { login, password } = formData;
				await loginUser({ login, password }).unwrap();
				handleFulfilledResult();
			} catch (error: any) {
				handleRejectedResult(error.data.message);
			}
		},
		[formData, handleFulfilledResult, handleRejectedResult, loginUser],
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<form onSubmit={handleLogin}>
				{formData.error && <div className={cls.error}>{formData.error}</div>}
				<Input
					name='login'
					autoFocus
					startContent={<MailIcon />}
					type='text'
					placeholder='Введите логин или email'
					variant='bordered'
					isInvalid={!!formData.loginError}
					errorMessage={formData.loginError}
					value={formData.login}
					onChange={(e) => {
						dispatch(loginFormActions.setLogin(e.target.value));
						dispatch(loginFormActions.setLoginError(''));
						dispatch(loginFormActions.setError(''));
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
						dispatch(loginFormActions.setPassword(e.target.value));
						dispatch(loginFormActions.setPasswordError(''));
						dispatch(loginFormActions.setError(''));
					}}
				/>
				<div className='flex py-2 px-1 justify-between'>
					{/* TODO */}
					{/* <Checkbox
						classNames={{
							label: 'text-small',
						}}
						isSelected={formData.remember}
						onValueChange={() =>
							dispatch(loginFormActions.setRemember(!formData.remember))
						}
					>
						Запомните меня
					</Checkbox> */}
					<Button clear disableRipple className={cls.button}>
						Забыли пароль?
					</Button>
				</div>
				<Button
					customVariant='layer'
					className='py-3 px-8 rounded-xl'
					hoverColor='147, 197, 253'
					starlight
					type='submit'
				>
					Войти
				</Button>
			</form>
		</DynamicModuleLoader>
	);
};

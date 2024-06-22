'use client';

import { ReduxStoreWithManager } from '@/app/store';
import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { ZodErrorsToObject } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FC, FormEvent, useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useLoginUserMutation } from '../../api/auth.api';
import { getLoginFormData } from '../../model/selectors/getLoginFormData';
import {
	loginFormReducer,
	useLoginFormActions,
} from '../../model/slice/login-form.slice';

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
	const errors = useSelector(getLoginFormData).error;
	const { setError, setLogin, setPassword, setRemember } =
		useLoginFormActions();

	const [loginUser] = useLoginUserMutation();

	const handleLogin = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			try {
				const { login, password } = formData;

				await loginUser({ login, password }).unwrap();
				onSubmit();
				reducerManager.remove('loginForm');
				reducerManager.remove('registerForm');
				dispatch({ type: `@DESTROY loginForm and registerForm reducer` });
			} catch (error: any) {
				setError(ZodErrorsToObject(error));
			}
		},
		[dispatch, formData, loginUser, onSubmit, reducerManager, setError],
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<form onSubmit={handleLogin}>
				<Input
					name='login'
					required
					autoFocus
					startContent={<MailIcon />}
					type='text'
					placeholder='Введите логин или email'
					variant='bordered'
					isInvalid={!!errors?.login}
					errorMessage={errors?.login}
					value={formData.login}
					onChange={(e) => {
						setLogin(e.target.value);
						setError({
							...formData.error,
							login: '',
						});
					}}
				/>
				<Input
					name='password'
					required
					startContent={<PasswordIcon />}
					placeholder='Введите пароль'
					type='password'
					variant='bordered'
					isInvalid={!!errors?.password}
					errorMessage={errors?.password}
					value={formData.password}
					onChange={(e) => {
						setPassword(e.target.value);
						setError({
							...formData.error,
							password: '',
						});
					}}
				/>
				{/* <div className='flex py-2 px-1 justify-between'>
					<Checkbox
						classNames={{
							label: 'text-small',
						}}
						isSelected={formData.remember}
						onValueChange={() =>
							dispatch(loginFormActions.setRemember(!formData.remember))
						}
					>
						Запомните меня
					</Checkbox>
					<Button clear disableRipple className={cls.button}>
						Забыли пароль?
					</Button>
				</div> */}
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

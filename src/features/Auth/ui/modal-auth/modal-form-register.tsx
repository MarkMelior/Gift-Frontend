'use client';

import { ReduxStoreWithManager } from '@/app/store';
import { MailIcon } from '@/shared/assets/icon/Mail';
import { PasswordIcon } from '@/shared/assets/icon/Password';
import { UserIcon } from '@/shared/assets/icon/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { ZodErrorsToObject } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FC, FormEvent, memo, useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRegisterUserMutation } from '../../api/auth.api';
import { getRegisterFormData } from '../../model/selectors/getRegisterFormData';
import {
	registerFormActions,
	registerFormReducer,
} from '../../model/slice/register-form.slice';

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
		const errors = useSelector(getRegisterFormData).error;
		const [registerUser] = useRegisterUserMutation();

		const handleRegister = useCallback(
			async (e: FormEvent) => {
				e.preventDefault();

				try {
					const { username, password, email } = formData;

					await registerUser({ username, password, email }).unwrap();
					onSubmit();
					reducerManager.remove('loginForm');
					reducerManager.remove('registerForm');
					dispatch({
						type: `@DESTROY loginForm and registerForm reducer`,
					});
				} catch (error: any) {
					dispatch(registerFormActions.setError(ZodErrorsToObject(error)));
				}
			},
			[dispatch, formData, onSubmit, reducerManager, registerUser],
		);

		return (
			<DynamicModuleLoader reducers={reducers}>
				<form onSubmit={handleRegister}>
					<Input
						name='username'
						required
						autoFocus
						startContent={<UserIcon />}
						placeholder='Придумайте логин'
						variant='bordered'
						isInvalid={!!errors?.username}
						errorMessage={errors?.username}
						value={formData.username}
						onChange={(e) => {
							dispatch(registerFormActions.setUsername(e.target.value));
							dispatch(
								registerFormActions.setError({
									...formData.error,
									username: '',
								}),
							);
						}}
					/>
					<Input
						name='email'
						required
						startContent={<MailIcon />}
						placeholder='Введите Email'
						variant='bordered'
						isInvalid={!!errors?.email}
						errorMessage={errors?.email}
						value={formData.email}
						onChange={(e) => {
							dispatch(registerFormActions.setEmail(e.target.value));
							dispatch(
								registerFormActions.setError({
									...formData.error,
									email: '',
								}),
							);
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
							dispatch(registerFormActions.setPassword(e.target.value));
							dispatch(
								registerFormActions.setError({
									...formData.error,
									password: '',
								}),
							);
						}}
					/>
					<Input
						name='password2'
						required
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

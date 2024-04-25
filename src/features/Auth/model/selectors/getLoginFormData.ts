import { RootState } from '@/app/store';
import { loginFormInitialState } from '../slice/login-form.slice';

export const getLoginFormData = (state: RootState) =>
	state.loginForm ?? loginFormInitialState;

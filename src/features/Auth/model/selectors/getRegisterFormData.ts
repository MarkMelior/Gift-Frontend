import { RootState } from '@/app/store';
import { registerFormInitialState } from '../slice/register-form.slice';

export const getRegisterFormData = (state: RootState) =>
	state.registerForm ?? registerFormInitialState;

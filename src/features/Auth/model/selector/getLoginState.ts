import { RootState } from '@/app/providers/StoreProvider';
import { loginInitialState } from '../slice/loginSlice';

export const getLoginState = (state: RootState) =>
	state?.loginForm ?? loginInitialState;

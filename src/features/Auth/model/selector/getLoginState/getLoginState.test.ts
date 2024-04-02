import { RootState } from '@/app/providers/StoreProvider';
import { loginInitialState } from '../../slice/loginSlice';
import { LoginState } from '../../types/loginState';
import { getLoginState } from './getLoginState';

describe('getLoginState.test', () => {
	test('should return initial state', () => {
		const initialState: LoginState = {
			username: 'MarkMelior',
			password: 'pass',
			isLoading: true,
		};

		const state: Partial<RootState> = {
			loginForm: initialState,
		};

		expect(getLoginState(state as RootState)).toEqual(initialState);
	});

	test('should work with empty state', () => {
		const state: Partial<RootState> = {};

		expect(getLoginState(state as RootState)).toEqual(loginInitialState);
	});
});

import { LoginState } from '../types/loginState';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
	test('test set username', () => {
		const state: Partial<LoginState> = { username: 'Foren' };
		expect(
			loginReducer(state as LoginState, loginActions.setUsername('MarkMelior')),
		).toEqual({ username: 'MarkMelior' });
	});

	test('test set password', () => {
		const state: Partial<LoginState> = { password: '123' };
		expect(
			loginReducer(state as LoginState, loginActions.setPassword('pass')),
		).toEqual({ password: 'pass' });
	});
});

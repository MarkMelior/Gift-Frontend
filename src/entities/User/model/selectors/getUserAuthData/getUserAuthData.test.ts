import { RootState } from '@/app/providers/StoreProvider';
import { User, UserState } from '../../types/user';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData.test', () => {
	test('should return initial state', () => {
		const authData: User = {
			id: 1,
			email: 'email@email.com',
			username: 'MarkMelior',
		};

		const initialState: UserState = { authData };

		const state: Partial<RootState> = {
			user: initialState,
		};

		expect(getUserAuthData(state as RootState)).toEqual(initialState.authData);
	});
});

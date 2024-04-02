import { User, userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests';
import axios from 'axios';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('loginByUsername.test', () => {
	test('success login', async () => {
		const userValue: User = {
			id: 1,
			username: 'MarkMelior',
			email: 'email@email.com',
		};

		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

		const thunk = new TestAsyncThunk(loginByUsername);
		const result = await thunk.callThunk({
			password: 'pass',
			username: 'MarkMelior',
		});

		expect(thunk.dispatch).toHaveBeenCalledWith(
			userActions.setAuthData(userValue),
		);
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(userValue);
	});

	test('error login', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

		const thunk = new TestAsyncThunk(loginByUsername);
		const result = await thunk.callThunk({
			password: 'pass',
			username: 'MarkMelior',
		});

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('error');
	});
});

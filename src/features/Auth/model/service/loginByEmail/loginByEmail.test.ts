// import { User, userActions } from '@/entities/User';
// import { TestAsyncThunk } from '@/shared/lib/tests';
// import { loginByEmail } from './loginByEmail';

// describe('loginByUsername.test', () => {
// 	test('success login', async () => {
// 		const userValue: User = {
// 			id: 1,
// 			email: 'markus@e.com',
// 		};

// 		const thunk = new TestAsyncThunk(loginByEmail);
// 		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
// 		const result = await thunk.callThunk({
// 			email: 'markus@e.com',
// 			password: 'pass',
// 		});

// 		expect(thunk.dispatch).toHaveBeenCalledWith(
// 			userActions.setAuthData(userValue),
// 		);
// 		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
// 		expect(thunk.api.post).toHaveBeenCalled();
// 		expect(result.meta.requestStatus).toBe('fulfilled');
// 		expect(result.payload).toEqual(userValue);
// 	});

// 	test('error login', async () => {
// 		const thunk = new TestAsyncThunk(loginByEmail);
// 		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
// 		const result = await thunk.callThunk({
// 			password: 'pass',
// 			username: 'MarkMelior',
// 		});

// 		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
// 		expect(thunk.api.post).toHaveBeenCalled();
// 		expect(result.meta.requestStatus).toBe('rejected');
// 		expect(result.payload).toBe('Вы ввели неверную почту или пароль');
// 	});
// });

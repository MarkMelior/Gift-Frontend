import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
	return configureStore<StateSchema>({
		reducer: {},
		// devTools: IS_DEV,
		preloadedState: initialState,
	});
};

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

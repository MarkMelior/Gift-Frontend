/* eslint-disable indent */
import { settingsActions } from '@/features/settings';
import { Middleware } from '@reduxjs/toolkit';

export const loaderMiddleware: Middleware =
	({ dispatch }) =>
	(next) =>
	(action) => {
		// @ts-ignore
		if (action.type) {
			const isPending = new RegExp(`pending$`, 'g');
			const isFulfilled = new RegExp(`fulfilled$`, 'g');
			const isRejected = new RegExp(`rejected$`, 'g');

			// @ts-ignore
			if (action.type.match(isPending)) {
				dispatch(settingsActions.setGlobalIsLoading(true));
			} else if (
				// @ts-ignore
				action.type.match(isFulfilled) ||
				// @ts-ignore
				action.type.match(isRejected)
			) {
				dispatch(settingsActions.setGlobalIsLoading(false));
			}
		}

		return next(action);
	};

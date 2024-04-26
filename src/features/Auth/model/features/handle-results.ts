// const handleFulfilledResult = (
// 	dispatch: any,
// 	onSubmit: () => void,
// 	reducerManager: any,
// ) => {
// 	onSubmit();
// 	reducerManager.remove('loginForm');
// 	reducerManager.remove('registerForm');
// 	dispatch({ type: `@DESTROY loginForm and registerForm reducer` });
// };

// const handleRejectedResult = (dispatch: any, actions: any, payload: any) => {
// 	if (typeof payload === 'string') {
// 		dispatch(actions.setError(payload));
// 	} else {
// 		const { username, password, email } = payload;
// 		dispatch(actions.setUsernameError(username));
// 		dispatch(actions.setPasswordError(password));
// 		dispatch(actions.setEmailError(email));
// 	}
// };

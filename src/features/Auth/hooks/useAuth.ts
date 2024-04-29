import { userActions, userApi } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib/hooks';

export const useAuth = () => {
	const dispatch = useAppDispatch();

	const onUserLogout = () => {
		dispatch(userActions.logout());
		dispatch(userApi.util.resetApiState());
	};

	return { onUserLogout };
};

import { useUserActions, userApi } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib/hooks';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const { logout } = useUserActions();

	const onUserLogout = () => {
		logout();
		dispatch(userApi.util.resetApiState());
	};

	return {
		onUserLogout,
	};
};

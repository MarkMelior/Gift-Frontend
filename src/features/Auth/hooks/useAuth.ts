import Cookies from 'js-cookie';

export const useAuth = () => {
	const onUserLogout = () => {
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');
		console.log(Cookies.get('refreshToken'));
	};

	return {
		onUserLogout,
	};
};

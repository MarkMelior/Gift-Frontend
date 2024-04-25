export interface LoginState {
	login: string;
	password: string;
	remember: boolean;
	isLoading: boolean;
	error?: string;
	loginError?: string;
	passwordError?: string;
}

export interface AccessToken {
	access_token: string;
}

export interface LoginProps {
	login: string;
	password: string;
}

export interface RegisterProps {
	email: string;
	username: string;
	password: string;
	avatar?: string;
}

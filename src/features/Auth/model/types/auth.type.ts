export interface LoginState {
	login: string;
	loginError?: string;
	password: string;
	passwordError?: string;
	remember: boolean;
	error?: string;
}

export interface RegisterState {
	email: string;
	emailError?: string;
	username: string;
	usernameError?: string;
	password: string;
	passwordError?: string;
	error?: string;
}

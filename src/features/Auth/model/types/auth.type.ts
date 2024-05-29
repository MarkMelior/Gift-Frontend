export interface LoginState {
	login: string;
	password: string;
	remember: boolean;
	error?: Partial<Omit<LoginState, 'error'>>;
}

export interface RegisterState {
	email: string;
	username: string;
	password: string;
	error?: Partial<Omit<RegisterState, 'error'>>;
}

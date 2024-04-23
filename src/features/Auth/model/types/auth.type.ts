export interface LoginState {
	login: string;
	password: string;
	isLoading: boolean;
	error?: string;
}

export interface AccessToken {
	access_token: string;
}

export interface LoginProps {
	login: string;
	password: string;
}

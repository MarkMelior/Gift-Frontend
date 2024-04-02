export interface User {
	id: number;
	email: string;
	username?: string;
}

export interface UserState {
	authData?: User;
}

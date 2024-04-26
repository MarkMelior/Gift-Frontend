import { userLogin } from './model/service/user-login';
import {
	AccessToken,
	LoginState,
	RegisterState,
} from './model/types/auth.type';
import ModalAuth from './ui/modal-auth/modal-auth';

export { ModalAuth, userLogin };
export type { AccessToken, LoginState, RegisterState };

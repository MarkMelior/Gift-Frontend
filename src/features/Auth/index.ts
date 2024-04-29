import { useAuth } from './hooks/useAuth';
import {
	AccessToken,
	LoginState,
	RegisterState,
} from './model/types/auth.type';
import ModalAuth from './ui/modal-auth/modal-auth';

export { ModalAuth, useAuth };
export type { AccessToken, LoginState, RegisterState };

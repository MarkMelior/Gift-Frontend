import { LoginState, RegisterState } from './model/types/auth.type';
import { loginUser } from './services/loginUser';
import { onUserLogout } from './services/onUserLogout';
import { registerUser } from './services/registerUser';
import ModalAuth from './ui/modal-auth/modal-auth';

export { ModalAuth, loginUser, onUserLogout, registerUser };
export type { LoginState, RegisterState };

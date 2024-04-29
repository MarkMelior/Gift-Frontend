import { isUserAdmin, isUserManager } from '@/entities/user';

export const AccessRole = {
	addProduct: isUserAdmin || isUserManager,
	updateProduct: isUserAdmin || isUserManager,
};

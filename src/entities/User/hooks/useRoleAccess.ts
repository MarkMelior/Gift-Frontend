import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getRoles';
import { UserRole } from '../model/types/user';

export const useRoleAccess = () => {
	const roles = useSelector(getUserRoles);

	const isAdmin = roles?.includes(UserRole.ADMIN);
	const isManager = roles?.includes(UserRole.MANAGER);

	return {
		isAdmin,
		isManager,
		// addProduct: isAdmin || isManager,
		// updateProduct: isAdmin || isManager,
	};
};

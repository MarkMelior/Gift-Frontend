'use client';

import { useSelector } from 'react-redux';
import { getUserRoles } from '../model/selectors/getRoles';

export const useRoleAccess = () => {
	const roles = useSelector(getUserRoles);

	const isAdmin = roles?.includes('admin');
	const isManager = roles?.includes('manager');

	return {
		isAdmin,
		isManager,
		// addProduct: isAdmin || isManager,
		// updateProduct: isAdmin || isManager,
	};
};

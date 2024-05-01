'use client';

import { useRoleAccess } from '@/entities/user';
import { AdminProductPage, NotFoundPage } from '@/views';

const AdminProduct = () => {
	const { isAdmin, isManager } = useRoleAccess();

	if (!isAdmin && !isManager) return <NotFoundPage />;

	return <AdminProductPage />;
};

export default AdminProduct;

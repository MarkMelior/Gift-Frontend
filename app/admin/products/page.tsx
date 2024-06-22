'use client';

import { useRoleAccess } from '@/entities/user';
import { PageLoader } from '@/shared/ui/page-loader';
import { AdminProductPage } from '@/views';

const AdminProduct = () => {
	const { isAdmin, isManager } = useRoleAccess();

	if (!isAdmin && !isManager) return <PageLoader />;
	// if (!isAdmin && !isManager) return <NotFoundPage />;

	return <AdminProductPage />;
};

export default AdminProduct;

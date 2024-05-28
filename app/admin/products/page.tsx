'use client';

import { useRoleAccess } from '@/entities/user';
import { AdminProductPage } from '@/views';
import { PageLoader } from '@/widgets/page-loader';

const AdminProduct = () => {
	const { isAdmin, isManager } = useRoleAccess();

	if (!isAdmin && !isManager) return <PageLoader />;
	// if (!isAdmin && !isManager) return <NotFoundPage />;

	return <AdminProductPage />;
};

export default AdminProduct;

'use client';

import { isUserAdmin } from '@/entities/user';
import { AdminProductPage, NotFoundPage } from '@/views';

const AdminProduct = () => {
	if (!isUserAdmin) return <NotFoundPage />;

	return <AdminProductPage />;
};

export default AdminProduct;

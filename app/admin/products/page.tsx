'use client';

import { AccessRole } from '@/shared/const';
import { AdminProductPage, NotFoundPage } from '@/views';

const AdminProduct = () => {
	if (!AccessRole.addProduct) return <NotFoundPage />;

	return <AdminProductPage />;
};

export default AdminProduct;

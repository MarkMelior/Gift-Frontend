import { userRoles } from '@/entities/user';
import { AdminProductPage, NotFoundPage } from '@/views';

const AdminProduct = async () => {
	const { isAdmin, isManager } = await userRoles();

	if (!isAdmin && !isManager) return <NotFoundPage />;

	return <AdminProductPage />;
};

export default AdminProduct;

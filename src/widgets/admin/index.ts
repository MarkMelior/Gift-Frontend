import { NavbarAdmin } from './navbar-admin/navbar-admin';
import { getMarketsProductModal } from './product-modal/model/selectors/getMarketsProductModal';
import { getProductModal } from './product-modal/model/selectors/getProductModal';
import { getProductModalErrors } from './product-modal/model/selectors/getProductModalErrors';
import {
	productModalActions,
	productModalInitialState,
} from './product-modal/model/slice/product-modal.slice';
import { ProductModalState } from './product-modal/model/types/product-modal';
import { ProductModal } from './product-modal/ui/product-modal';

export {
	NavbarAdmin,
	ProductModal,
	getMarketsProductModal,
	getProductModal,
	getProductModalErrors,
	productModalActions,
	productModalInitialState,
};

export type { ProductModalState };

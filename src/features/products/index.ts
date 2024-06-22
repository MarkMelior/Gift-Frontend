import { ProductModal } from '../../widgets/product-modal/product-modal';
import { useGetProductsHistoryQuery } from './api/products-history.api';
import {
	addProduct,
	deleteProduct,
	getProducts,
	updateProduct,
	useGetProductQuery,
	useGetProductsQuery,
} from './api/products.api';
import { useProductsHistory } from './hooks/useProductsHistory';
import { getMarketsProductModal } from './model/selectors/getMarketsProductModal';
import { getProductModal } from './model/selectors/getProductModal';
import { getProductModalErrors } from './model/selectors/getProductModalErrors';
import {
	productModalActions,
	productModalInitialState,
	productModalReducer,
	useProductModalActions,
} from './model/slice/product-modal.slice';
import { ProductModalState } from './model/types/product-modal';
import { CardWide } from './ui/card-wide/card-wide';
import { CardWideSkeleton } from './ui/card-wide/card-wide.skeleton';
import { Cards } from './ui/cards/cards';
import { MarketsEditor } from './ui/markets-editor/markets-editor';
import { OptionsEditor } from './ui/options-editor/options-editor';

export {
	CardWide,
	CardWideSkeleton,
	Cards,
	MarketsEditor,
	OptionsEditor,
	ProductModal,
	addProduct,
	deleteProduct,
	getMarketsProductModal,
	getProductModal,
	getProductModalErrors,
	getProducts,
	productModalActions,
	productModalInitialState,
	productModalReducer,
	updateProduct,
	useGetProductQuery,
	useGetProductsHistoryQuery,
	useGetProductsQuery,
	useProductModalActions,
	useProductsHistory,
};
export type { ProductModalState };

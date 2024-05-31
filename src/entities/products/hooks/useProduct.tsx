'use client';

import { deleteProduct as deleteProductDispatcher } from '@/entities/products';
import { ProductModal, productModalActions } from '@/features/product-edit';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useMessage } from '@/shared/ui/message';
import { ProductResponse } from '@melior-gift/zod-contracts';
import { useDisclosure } from '@nextui-org/react';
import { createPortal } from 'react-dom';

// ! TODO
export const useProduct = () => {
	const dispatch = useAppDispatch();
	const { showMessage } = useMessage();
	const {
		isOpen: isOpenAdd,
		onOpen: onOpenAdd,
		onOpenChange: onOpenChangeAdd,
	} = useDisclosure();

	const deleteProduct = (article: string) => {
		// createPortal(
		// 	<ProductModal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd} />,
		// 	document.body,
		// );

		dispatch(deleteProductDispatcher(article));
		showMessage({
			content: `Продукт ${article} успешно удалён!`,
			type: 'close',
		});
	};

	const addProduct = () => {
		onOpenAdd();

		return createPortal(
			<ProductModal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd} />,
			document.body,
		);
	};

	const editProduct = (data: ProductResponse) => {
		dispatch(productModalActions.updateProductModal(data));

		createPortal(
			<ProductModal isOpen={isOpenAdd} isEdit onOpenChange={onOpenChangeAdd} />,
			document.body,
		);
	};

	return { deleteProduct, addProduct, editProduct };
};
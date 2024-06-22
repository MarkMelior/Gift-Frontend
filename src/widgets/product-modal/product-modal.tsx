'use client';

import {
	MarketsEditor,
	OptionsEditor,
	addProduct,
	getProductModal,
	getProductModalErrors,
	productModalReducer,
	updateProduct,
	useProductModalActions,
} from '@/features/products';
import { ChangeImages, UploadImages } from '@/features/upload-image';
import { DynamicModuleLoader } from '@/shared/lib/components';
import { parseErrorPathToNestedObject } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/input';
import { useMessage } from '@/shared/ui/message';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { SortSelectInput } from '@/widgets/sorts';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Slider,
	Textarea,
} from '@nextui-org/react';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ZodError } from 'zod';
import cls from './product-modal.module.scss';

export interface ProductModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	isEdit?: boolean;
}

// const reducers: ReducersList = {
// 	productModal: productModalReducer,
// };

export const ProductModal: FC<ProductModalProps> = ({
	isOpen,
	onOpenChange,
	isEdit,
}) => {
	const dispatch = useAppDispatch();
	const { updateProductModal, setErrorsProductModal, clearProductModal } =
		useProductModalActions();
	const product = useSelector(getProductModal);
	const productError = useSelector(getProductModalErrors);
	const [images, setImages] = useState<FileList>();
	const { showMessage } = useMessage();

	const onChangeTitle = useCallback(
		(value: string) => {
			updateProductModal({
				title: value,
			});
			setErrorsProductModal({
				title: '',
			});
		},
		[setErrorsProductModal, updateProductModal],
	);

	const onChangeCreativity = useCallback(
		(value: number | number[]) => {
			let creativityValue: number;
			if (typeof value === 'number') {
				creativityValue = value;
			} else {
				creativityValue = value[0];
			}

			updateProductModal({ creativity: creativityValue });
		},
		[updateProductModal],
	);

	const onChangeDescription = useCallback(
		(value: string) => {
			updateProductModal({
				description: value,
			});
		},
		[updateProductModal],
	);

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!images && !isEdit) {
			setErrorsProductModal({
				images: 'Выберите изображения',
			});
			return;
		}

		try {
			if (!product) throw new Error('Product not found');

			if (isEdit) {
				await dispatch(
					updateProduct({ body: product, productArticle: product.article! }),
				).unwrap();
			} else {
				await dispatch(addProduct({ body: product, images: images! })).unwrap();
			}

			clearProductModal();
			onOpenChange(false);
			showMessage({
				content: isEdit
					? `Продукт ${product.article} успешно изменён!`
					: `Продукт ${product.article} успешно добавлен!`,
				type: 'success',
			});
		} catch (e: any) {
			const error = e.data as ZodError;

			error.issues.map((error) => {
				setErrorsProductModal(
					parseErrorPathToNestedObject(error.path, error.message),
				);
			});
		}
	};

	return (
		<>
			{/* <Component isRender={isOpen} delayClose={500}> */}
			<DynamicModuleLoader
				reducers={{
					productModal: productModalReducer,
				}}
			>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					size='lg'
					scrollBehavior='inside'
					onClose={() => {
						isEdit && clearProductModal();
					}}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className='flex flex-col gap-1'>
									Редактор продукта
								</ModalHeader>
								<ModalBody className={cls.body}>
									<form className='flex flex-col gap-5'>
										{isEdit ? (
											<ChangeImages />
										) : (
											<UploadImages
												state={{ images, setImages }}
												error={productError?.images}
											/>
										)}
										<Input
											name='title'
											label='Название продукта'
											size='sm'
											value={product?.title}
											errorMessage={productError?.title}
											onChange={(e) => onChangeTitle(e.target.value)}
										/>
										<SortSelectInput />
										<MarketsEditor />
										<OptionsEditor />
										<Slider
											size='lg'
											step={1}
											name='creativity'
											color='primary'
											label='Креативность'
											showSteps={true}
											maxValue={10}
											minValue={1}
											className='max-w-md'
											value={product?.creativity}
											onChange={onChangeCreativity}
										/>
										<Textarea
											label='Описание'
											size='sm'
											description='Добавьте дополнительную информацию для быстрого поиска'
											name='description'
											value={product?.description}
											onChange={(e) => onChangeDescription(e.target.value)}
										/>
									</form>
								</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='light' onPress={onClose}>
										Отменить
									</Button>
									<Button color='primary' onClick={onSubmit}>
										Сохранить продукт
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</DynamicModuleLoader>
		</>
	);
};

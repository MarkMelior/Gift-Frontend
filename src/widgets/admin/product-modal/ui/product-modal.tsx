import { addProduct } from '@/entities/products';
import { MarketsEditor, OptionsEditor } from '@/features/product-edit';
import { SortSelectInput } from '@/features/sorts';
import { UploadImages } from '@/features/upload-image';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { parseErrorPathToNestedObject } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/input';
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
import { getProductModal } from '../model/selectors/getProductModal';
import {
	productModalActions,
	productModalReducer,
} from '../model/slice/product-modal.slice';
import cls from './product-modal.module.scss';

export interface ProductModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const reducers: ReducersList = {
	productModal: productModalReducer,
};

export const ProductModal: FC<ProductModalProps> = ({
	isOpen,
	onOpenChange,
}) => {
	const dispatch = useAppDispatch();
	const product = useSelector(getProductModal);
	const [images, setImages] = useState<FileList>();

	const onChangeTitle = useCallback(
		(value: string) => {
			dispatch(
				productModalActions.updateProductModal({
					title: value,
				}),
			);
			dispatch(
				productModalActions.setErrorsProductModal({
					title: '',
				}),
			);
		},
		[dispatch],
	);

	const onChangeCreativity = useCallback(
		(value: number | number[]) => {
			let creativityValue: number;
			if (typeof value === 'number') {
				creativityValue = value;
			} else {
				creativityValue = value[0];
			}
			dispatch(
				productModalActions.updateProductModal({
					creativity: creativityValue,
				}),
			);
		},
		[dispatch],
	);

	const onChangeDescription = useCallback(
		(value: string) => {
			dispatch(
				productModalActions.updateProductModal({
					description: value,
				}),
			);
		},
		[dispatch],
	);

	const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!images) {
			dispatch(
				productModalActions.setErrorsProductModal({
					images: 'Выберите изображения',
				}),
			);
			return;
		}

		try {
			await dispatch(addProduct({ body: product, images })).unwrap();

			dispatch(productModalActions.clearProductModal());
			onOpenChange(false);
			// todo: notification
		} catch (e: any) {
			const error = e.data as ZodError;

			error.issues.map((error) => {
				dispatch(
					productModalActions.setErrorsProductModal(
						parseErrorPathToNestedObject(error.path, error.message),
					),
				);
			});
		}
	};

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size='lg'
				scrollBehavior='inside'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Добавление продукта
							</ModalHeader>
							<ModalBody className={cls.body}>
								<form className='flex flex-col gap-5'>
									<UploadImages
										state={{ images, setImages }}
										error={product?.errors?.images}
									/>
									<Input
										name='title'
										label='Название продукта'
										size='sm'
										value={product?.title}
										errorMessage={product?.errors?.title}
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
									Создать продукт
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</DynamicModuleLoader>
	);
};

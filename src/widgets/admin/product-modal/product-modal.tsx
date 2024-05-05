import { addProduct } from '@/entities/products';
import { AboutEditor, MarketsEditor } from '@/features/product-edit';
import { SortSelectInput } from '@/features/sorts';
import { UploadImages } from '@/features/upload-image';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/input';
import {
	ProductCreateRequest,
	ProductMarkets,
	SortFilters,
} from '@melior-gift/zod-contracts';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Selection,
	Slider,
	Textarea,
} from '@nextui-org/react';
import { FC, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { ZodError } from 'zod';
import cls from './product-modal.module.scss';

type Errors = Partial<
	Omit<ProductCreateRequest, 'images'> & { images: string }
>;

export interface ProductModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ProductModal: FC<ProductModalProps> = ({
	isOpen,
	onOpenChange,
}) => {
	const [images, setImages] = useState<FileList>();
	const [title, setTitle] = useState('');
	const [creativity, setCreativity] = useState(6);
	const [filters, setFilters] = useState<Selection>(new Set([]));
	const [markets, setMarkets] = useState<ProductMarkets[]>([
		{
			market: 'ozon',
			link: '',
			price: 2999,
			rating: 5,
			reviewCount: 245,
			oldPrice: 4999,
		},
	]);
	const [options, setOptions] = useState([]);
	const [description, setDescription] = useState('');

	const [errors, setErrors] = useState<Errors>({});
	const [formData, setFormData] = useState<ProductCreateRequest>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		setFormData({
			title,
			markets,
			creativity,
			filters: Array.from(filters) as SortFilters[],
			description,
			options,
		});
		setErrors({});
	}, [creativity, description, filters, images, markets, options, title]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!images) {
			setErrors((prev) => ({
				...prev,
				images: 'Выберите изображения',
			}));
			return;
		}

		try {
			await dispatch(
				addProduct({ body: formData as ProductCreateRequest, images }),
			).unwrap();
		} catch (e: any) {
			const error = e.data as ZodError;

			error.issues.map((error) => {
				setErrors((prev) => ({
					...prev,
					[error.path[0]]: error.message,
				}));
			});
		}
	};

	return (
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
							<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
								<Input
									errorMessage={errors.title}
									label='Название продукта'
									name='title'
									value={title}
									size='sm'
									onChange={(e) => setTitle(e.target.value)}
								/>
								<UploadImages
									state={{ images, setImages }}
									error={errors.images}
								/>
								<Slider
									size='lg'
									step={1}
									name='creativity'
									color='primary'
									label='Креативность'
									showSteps={true}
									maxValue={10}
									minValue={1}
									defaultValue={6}
									className='max-w-md'
									value={creativity}
									onChange={(value: number | number[]) =>
										setCreativity(value as SetStateAction<number>)
									}
								/>
								<SortSelectInput
									selectedKeys={filters}
									onSelectionChange={setFilters}
								/>
								<AboutEditor />
								<MarketsEditor markets={markets} setMarkets={setMarkets} />
								<Textarea
									label='Описание'
									size='sm'
									description='Добавьте дополнительную информацию для быстрого поиска'
									name='description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<Button type='submit'>Создать новый продукт</Button>
							</form>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								Отменить
							</Button>
							<Button color='primary' onPress={onClose}>
								Todo: Создать продукт
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

'use client';

import { addProduct } from '@/entities/products';
import { CharacteristicsEditor } from '@/features/product-edit';
import { SortSelectInput } from '@/features/sorts';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
	ProductCreateRequest,
	ProductMarkets,
	SortFilters,
} from '@melior-gift/zod-contracts';
import { Selection, Slider } from '@nextui-org/react';
import {
	ChangeEvent,
	FC,
	FormEvent,
	SetStateAction,
	memo,
	useEffect,
	useState,
} from 'react';
import { ZodError } from 'zod';

type Errors = Partial<
	Omit<ProductCreateRequest, 'images'> & { images: string }
>;

export const AdminProductPage: FC = memo(() => {
	const [images, setImages] = useState<FileList>();
	const [title, setTitle] = useState('');
	const [seoText, setSeoText] = useState('');
	const [characteristics, setCharacteristics] = useState({});
	const [markets, setMarkets] = useState<ProductMarkets[]>([]);
	const [creativity, setCreativity] = useState(6);
	const [filters, setFilters] = useState<Selection>(new Set([]));

	const [errors, setErrors] = useState<Errors>({});
	const [formData, setFormData] = useState<ProductCreateRequest>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		setFormData({
			title,
			characteristics,
			markets,
			seoText,
			creativity,
			filters: Array.from(filters) as SortFilters[],
		});
		setErrors({});
	}, [characteristics, creativity, filters, images, markets, seoText, title]);

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
		<div className='content flex flex-col items-center py-12'>
			<h1>Добавление продукта</h1>
			<form onSubmit={handleSubmit} className='flex flex-col gap-5 w-[390px]'>
				<Input
					isRequired
					errorMessage={errors.title}
					label='Название продукта'
					name='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor='image'>Изображения: *</label>
				<input
					type='file'
					id='images'
					name='images'
					accept='images/*,.png,.jpg,.jpeg'
					multiple
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						const files = e.target.files;
						if (files) setImages(files);
					}}
				/>
				{errors.images && (
					<p className='text-red-500 text-xs'>{errors.images}</p>
				)}
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
				<CharacteristicsEditor />
				{/* <Input
					label='Характеристики'
					name='characteristics'
					value={JSON.stringify(formData.characteristics)}
					onChange={handleInputChange}
				/> */}
				<Input
					label='SEO текст'
					description='Добавьте дополнительную информацию для быстрого поиска'
					name='seoText'
					value={seoText}
					onChange={(e) => setSeoText(e.target.value)}
				/>
				<Button type='submit'>Создать новый продукт</Button>
			</form>
		</div>
	);
});

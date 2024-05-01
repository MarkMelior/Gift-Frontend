'use client';

import { CreateProductDto, addProduct } from '@/entities/products';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent, FC, FormEvent, memo, useState } from 'react';

const filters = [
	{
		label: 'Мужчинам',
		value: 'male',
		description: 'The second most popular pet in the world',
	},
	{
		label: 'Женщинам',
		value: 'female',
		description: 'The most popular pet in the world',
	},
	{
		label: 'Детям',
		value: 'kid',
		description: 'The largest land animal',
	},
	{
		label: 'Взрослым',
		value: 'adult',
		description: 'The king of the jungle',
	},
	{
		label: 'Старикам',
		value: 'old',
		description: 'The largest cat species',
	},
	{
		label: 'День рождение',
		value: 'birthday',
		description: 'The tallest land animal',
	},
	{
		label: 'Влюблённым',
		value: 'love',
		description: 'A widely distributed and diverse group of aquatic mammals',
	},
	{
		label: 'Новый год',
		value: 'year',
		description: 'A group of aquatic flightless birds',
	},
	{
		label: 'Приколы',
		value: 'joke',
		description: 'A several species of African equids',
	},
];

export const AdminProductPage: FC = memo(() => {
	const [formData, setFormData] = useState<CreateProductDto>({
		title: '',
		creativity: 4.5,
		filters: [],
		characteristics: {},
		markets: [],
		seoText: '',
	});
	const [images, setImages] = useState<File[]>([]);

	const dispatch = useAppDispatch();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		if (type === 'file') {
			const files = e.target.files;
			if (files) {
				setImages(Array.from(files));
			}
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(formData);
		const product = await dispatch(addProduct(formData));
		console.log(product);
		// dispatch(addProductImages({ images, productArticle: product.article }));
	};

	return (
		<div className='content flex flex-col items-center py-12'>
			<h1>Добавление продукта</h1>
			<form onSubmit={handleSubmit} className='flex flex-col gap-5 w-[390px]'>
				<Input
					isRequired
					label='Название продукта'
					name='title'
					value={formData.title}
					onChange={handleInputChange}
				/>
				<label htmlFor='image'>Изображения:</label>
				<Input
					isRequired
					type='file'
					id='image'
					name='image'
					accept='image/*'
					multiple
					onChange={handleInputChange}
				/>
				<Input
					isRequired
					label='Креативность'
					type='number'
					name='creativity'
					max={5}
					min={1}
					value={String(formData.creativity)}
					onChange={handleInputChange}
				/>
				<Select
					label='Фильтры'
					selectionMode='multiple'
					description='Выберите то, что не должно попасть в категории'
				>
					{filters.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
					))}
				</Select>
				{/* <Input
					label='Фильтры'
					placeholder='Фильтры'
					name='filters'
					value={formData.filters.join(',')}
					onChange={handleInputChange}
				/> */}
				<Input
					label='Характеристики'
					name='characteristics'
					value={JSON.stringify(formData.characteristics)}
					onChange={handleInputChange}
				/>
				<Input
					label='SEO текст'
					description='Добавьте дополнительную информацию для быстрого поиска'
					name='seoText'
					value={formData.seoText}
					onChange={handleInputChange}
				/>
				<Button type='submit'>Создать новый продукт</Button>
			</form>
		</div>
	);
});

'use client';

import { $api } from '@/shared/api/api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ChangeEvent, FC, FormEvent, memo, useState } from 'react';

export const AdminProductPage: FC = memo(() => {
	const [formData, setFormData] = useState({
		title: '',
		images: [],
		creativity: 0,
		filters: [],
		characteristics: {},
		markets: [],
		seoText: '',
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		if (type === 'file') {
			const files = e.target.files;
			if (files) {
				const imageFiles = Array.from(files);
				const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
				setFormData({
					...formData,
					images: imageUrls,
				});
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

		try {
			const response = await $api.post('/products', formData);
			console.log('Product created:', response.data);
		} catch (error) {
			console.error('Error creating product:', error);
		}
	};

	return (
		<div className='content'>
			<h1>Ты админ настоящий!</h1>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 w-[390px]'>
				<Input
					label='Название продукта'
					placeholder='Название продукта'
					name='title'
					value={formData.title}
					onChange={handleInputChange}
				/>
				<label htmlFor='image'>Изображения:</label>
				<Input
					type='file'
					id='image'
					name='image'
					accept='image/*'
					multiple
					onChange={handleInputChange}
				/>
				<Input
					label='Творчество'
					type='number'
					placeholder='Творчество'
					name='creativity'
					value={formData.creativity.toString()}
					onChange={handleInputChange}
				/>
				<Input
					label='Фильтры'
					placeholder='Фильтры'
					name='filters'
					value={formData.filters.join(',')}
					onChange={handleInputChange}
				/>
				<Input
					label='Характеристики'
					placeholder='Характеристики'
					name='characteristics'
					value={JSON.stringify(formData.characteristics)}
					onChange={handleInputChange}
				/>
				<Input
					label='SEO текст'
					placeholder='SEO текст'
					name='seoText'
					value={formData.seoText}
					onChange={handleInputChange}
				/>
				<Button type='submit'>Создать новый продукт</Button>
			</form>
		</div>
	);
});

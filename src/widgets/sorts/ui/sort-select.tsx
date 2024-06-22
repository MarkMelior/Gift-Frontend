import { getProductModal, useProductModalActions } from '@/features/products';
import { SortFilters } from '@melior-gift/zod-contracts';
import {
	Select,
	SelectItem,
	SelectSection,
	Selection,
} from '@nextui-org/react';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ageButton } from '../model/const/age-button';
import { categoryButton } from '../model/const/category-button';
import { sexButton } from '../model/const/sex-button';

export const SortSelectInput: FC = () => {
	const product = useSelector(getProductModal);
	const { updateProductModal } = useProductModalActions();

	const onChangeFilters = useCallback(
		(value: Selection) => {
			updateProductModal({
				filters: Array.from(value) as SortFilters[],
			});
		},
		[updateProductModal],
	);

	return (
		<Select
			label='Фильтры'
			size='sm'
			selectionMode='multiple'
			description='Выберите категорию, кому это точно не подойдёт'
			selectedKeys={product?.filters}
			onSelectionChange={onChangeFilters}
		>
			<SelectSection title='Возраст'>
				{ageButton.map(({ key, text }) => {
					return (
						<SelectItem key={key} value={key}>
							{text}
						</SelectItem>
					);
				})}
			</SelectSection>
			<SelectSection title='Категория'>
				{categoryButton.map(({ key, text }) => {
					return (
						<SelectItem key={key} value={key}>
							{text}
						</SelectItem>
					);
				})}
			</SelectSection>
			<SelectSection title='Пол'>
				{sexButton.map(({ key, text }) => {
					return (
						<SelectItem key={key} value={key}>
							{text}
						</SelectItem>
					);
				})}
			</SelectSection>
		</Select>
	);
};

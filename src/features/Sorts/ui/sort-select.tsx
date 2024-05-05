import {
	Select,
	SelectItem,
	SelectSection,
	Selection,
} from '@nextui-org/react';
import { FC, memo } from 'react';
import { ageButton } from '../model/const/age-button';
import { categoryButton } from '../model/const/category-button';
import { sexButton } from '../model/const/sex-button';

interface SortSelectInputProps {
	selectedKeys: string[] | Selection;
	onSelectionChange: (keys: Selection) => any;
}

export const SortSelectInput: FC<SortSelectInputProps> = memo(
	({ selectedKeys, onSelectionChange }) => {
		return (
			<Select
				label='Фильтры'
				size='sm'
				selectionMode='multiple'
				description='Выберите категорию, кому это точно не подойдёт'
				selectedKeys={selectedKeys}
				onSelectionChange={onSelectionChange}
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
	},
);

import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/input';
import { Button } from '@nextui-org/react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getProductModal } from '../../model/selectors/getProductModal';
import { productModalActions } from '../../model/slice/product-modal.slice';

export const OptionsEditor = () => {
	const dispatch = useAppDispatch();
	const options = useSelector(getProductModal)?.options;

	const onChangeName = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateOptionsProductModal({
					name: value,
					value: options && options[index].value,
					index,
				}),
			);
		},
		[dispatch, options],
	);

	const onChangeValue = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateOptionsProductModal({
					name: options && options[index].name,
					value,
					index,
				}),
			);
		},
		[dispatch, options],
	);

	const removeOption = useCallback(
		(index: number) => {
			dispatch(
				productModalActions.updateProductModal({
					options: options?.filter((_, i) => i !== index),
				}),
			);
		},
		[dispatch, options],
	);

	const addOption = useCallback(() => {
		dispatch(
			productModalActions.updateProductModal({
				options: [...(options ?? []), { name: '', value: '' }],
			}),
		);
	}, [dispatch, options]);

	return (
		<div className='flex flex-col gap-2'>
			<h2>О товаре</h2>
			<div className='flex flex-col gap-2'>
				{options &&
					options.map(({ name, value }, index) => (
						<div key={index} className='flex gap-2 items-center'>
							<Input
								type='text'
								placeholder='Ключ'
								size='sm'
								variant='bordered'
								value={name}
								onChange={(e) => onChangeName(e.target.value, index)}
							/>
							<Input
								type='text'
								placeholder='Значение'
								size='sm'
								variant='bordered'
								value={value}
								onChange={(e) => onChangeValue(e.target.value, index)}
							/>
							<Button
								color='danger'
								isIconOnly
								onClick={() => removeOption(index)}
								size='sm'
								variant='ghost'
							>
								<DeleteIcon width={18} height={18} />
							</Button>
						</div>
					))}
			</div>
			<Button variant='flat' onClick={addOption}>
				Добавить
			</Button>
		</div>
	);
};

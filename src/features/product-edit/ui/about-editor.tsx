import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { Input } from '@/shared/ui/input';
import { Button } from '@nextui-org/react';
import { memo, useEffect, useState } from 'react';

export const AboutEditor = memo(() => {
	const [options, setOptions] = useState([
		{
			name: '',
			value: '',
		},
	]);

	const handleChangeName = (index: number, newName: string) => {
		setOptions((prevOptions) => {
			const updatedOptions = [...prevOptions];
			updatedOptions[index].name = newName;
			return updatedOptions;
		});
	};

	const handleChangeValue = (index: number, newValue: string) => {
		setOptions((prevOptions) => {
			const updatedOptions = [...prevOptions];
			updatedOptions[index].value = newValue;
			return updatedOptions;
		});
	};

	const handleRemoveOptions = (nameToRemove: string) => {
		setOptions((prevOptions) => {
			return prevOptions.filter((option) => option.name !== nameToRemove);
		});
	};

	const handleAddOptions = () => {
		setOptions((prevOptions) => [
			...prevOptions,
			{
				name: '',
				value: '',
			},
		]);
	};

	useEffect(() => {
		console.log(options);
	}, [options]);

	return (
		<div className='flex flex-col gap-2'>
			<h2>О товаре</h2>
			<div className='flex flex-col gap-2'>
				{options.map(({ name, value }, index) => (
					<div key={index} className='flex gap-2 items-center'>
						<Input
							type='text'
							placeholder='Ключ'
							size='sm'
							variant='bordered'
							value={name}
							onChange={(e) => handleChangeName(index, e.target.value)}
						/>
						<Input
							type='text'
							placeholder='Значение'
							size='sm'
							variant='bordered'
							value={value}
							onChange={(e) => handleChangeValue(index, e.target.value)}
						/>
						<Button
							color='danger'
							isIconOnly
							onClick={() => handleRemoveOptions(name)}
							size='sm'
							variant='ghost'
						>
							<DeleteIcon width={18} height={18} />
						</Button>
					</div>
				))}
			</div>
			<Button variant='flat' color='primary' onClick={handleAddOptions}>
				Добавить
			</Button>
		</div>
	);
});

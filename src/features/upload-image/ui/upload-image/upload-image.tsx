'use client';

import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { StrictModeDroppable } from '@/shared/lib/components';
import { Button, Tooltip } from '@nextui-org/react';
import { FC, SetStateAction, useRef } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import cls from './upload-image.module.scss';

interface UploadImagesProps {
	label?: string;
	error: string | undefined;
	state: {
		images: FileList | undefined;
		setImages: (value: SetStateAction<FileList | undefined>) => void;
	};
}

export const UploadImages: FC<UploadImagesProps> = ({
	error,
	label,
	state,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) state.setImages(files);
	};

	const handleRemoveImage = (indexToRemove: number) => {
		state.setImages((prevImages) => {
			if (!prevImages) return undefined;
			const updatedImages = Array.from(prevImages);
			updatedImages.splice(indexToRemove, 1);
			const dataTransfer = new DataTransfer();
			updatedImages.forEach((image) => {
				dataTransfer.items.add(image);
			});

			return dataTransfer.files.length > 0 ? dataTransfer.files : undefined;
		});
	};

	const onDragEnd = (result: any) => {
		if (!result.destination) return;

		state.setImages((prevImages) => {
			if (!prevImages) return undefined;
			const reorderedImages = Array.from(prevImages);
			const [removed] = reorderedImages.splice(result.source.index, 1);
			reorderedImages.splice(result.destination.index, 0, removed);
			const dataTransfer = new DataTransfer();
			reorderedImages.forEach((image) => {
				dataTransfer.items.add(image);
			});

			return dataTransfer.files.length > 0 ? dataTransfer.files : undefined;
		});
	};

	return (
		<div className={cls.wrapper}>
			{label && <label htmlFor='image'>{label}</label>}
			<input
				type='file'
				id='images'
				name='images'
				accept='images/*,.png,.jpg,.jpeg,.webp'
				multiple
				ref={fileInputRef}
				className={cls.hidden}
				onChange={handleImageChange}
			/>
			<DragDropContext onDragEnd={onDragEnd}>
				<StrictModeDroppable droppableId='images' direction='horizontal'>
					{(provided) => (
						<div
							className={cls.images}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{state.images &&
								Array.from(state.images).map((image, index) => (
									<Draggable
										key={image.name}
										draggableId={image.name}
										index={index}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={cls.image}
											>
												<img
													src={URL.createObjectURL(image)}
													alt={`Uploaded image ${index}`}
												/>
												<Tooltip
													content={'Удалить'}
													placement='top'
													delay={300}
													closeDelay={0}
												>
													<Button
														isIconOnly
														color='danger'
														className={cls.button}
														onClick={() => handleRemoveImage(index)}
													>
														<DeleteIcon width={18} height={18} />
													</Button>
												</Tooltip>
											</div>
										)}
									</Draggable>
								))}
							{provided.placeholder}
							<Button className={cls.image} onClick={handleUploadButtonClick}>
								Загрузить
							</Button>
						</div>
					)}
				</StrictModeDroppable>
			</DragDropContext>
			{error && <p className='text-red-500 text-xs'>{error}</p>}
		</div>
	);
};

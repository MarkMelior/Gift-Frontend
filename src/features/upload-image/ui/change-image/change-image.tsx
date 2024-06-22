'use client';

// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { getProductModal, productModalActions } from '@/features/products';
import { StrictModeDroppable } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { FC, useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import cls from './change-image.module.scss';

export const ChangeImages: FC = () => {
	const product = useSelector(getProductModal);
	const [images, setImages] = useState<string[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (product?.images) {
			setImages(product.images);
		}
	}, [product?.images]);

	const handleImageChange = (newImages: string[]) => {
		dispatch(
			productModalActions.updateProductModal({ ...product, images: newImages }),
		);
	};

	const onDragEnd = (result: any) => {
		if (!result.destination) return;

		const reorderedImages = Array.from(images);
		const [removed] = reorderedImages.splice(result.source.index, 1);
		reorderedImages.splice(result.destination.index, 0, removed);

		setImages(reorderedImages);
		handleImageChange(reorderedImages);
	};

	return (
		<div>
			<DragDropContext onDragEnd={onDragEnd}>
				<StrictModeDroppable droppableId='images' direction='horizontal'>
					{(provided) => (
						<div
							className={cls.images}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{images.map((image, index) => (
								<Draggable key={image} draggableId={image} index={index}>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={cls.image}
										>
											<img
												src={`${process.env.UPLOADS}/products/${product?.article}/${image}`}
												alt={`Image ${index}`}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</StrictModeDroppable>
			</DragDropContext>
		</div>
	);
};

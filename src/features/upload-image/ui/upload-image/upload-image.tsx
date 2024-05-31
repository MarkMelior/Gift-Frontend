'use client';

import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { Button, Tooltip } from '@nextui-org/react';
import { FC, SetStateAction, useRef } from 'react';
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

	return (
		<div className={cls.wrapper}>
			{label && <label htmlFor='image'>{label}</label>}
			<input
				type='file'
				id='images'
				name='images'
				accept='images/*,.png,.jpg,.jpeg'
				multiple
				ref={fileInputRef}
				className={cls.hidden}
				onChange={handleImageChange}
			/>
			<div className={cls.images}>
				{state.images &&
					Array.from(state.images).map((image, index) => (
						<div key={index} className={cls.image}>
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
					))}
				<Button className={cls.image} onClick={handleUploadButtonClick}>
					Загрузить
				</Button>
			</div>
			{error && <p className='text-red-500 text-xs'>{error}</p>}
		</div>
	);
};

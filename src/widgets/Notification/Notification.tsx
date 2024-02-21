'use client';

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

interface NotificationProps {
	message: string;
	duration?: number;
	closable?: boolean;
	onClose?: () => void;
	onCancel?: () => void;
	icon?: string;
}

export const Notification: FC<NotificationProps> = ({
	message,
	duration = 5000,
	closable = true,
	onClose,
	onCancel,
	icon,
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			if (onClose) onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, []);

	const handleClose = () => {
		setVisible(false);
		if (onClose) onClose();
	};

	const handleCancel = () => {
		setVisible(false);
		if (onCancel) onCancel();
	};

	return (
		<div className={`notification ${visible ? 'show' : 'hide'}`}>
			{icon && (
				<Image
					width={24}
					height={24}
					src={icon}
					alt='icon'
					className='notification-icon'
				/>
			)}
			<div className='notification-content'>
				<p>{message}</p>
			</div>
			{closable && (
				<button type='button' className='close-btn' onClick={handleClose}>
					×
				</button>
			)}
			{onCancel && (
				<button type='button' className='cancel-btn' onClick={handleCancel}>
					Cancel
				</button>
			)}
		</div>
	);
};

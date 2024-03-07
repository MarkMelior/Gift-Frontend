'use client';

import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import Image from 'next/image';
import { FC, memo, useState } from 'react';
import cls from './Notification.module.scss';

interface NotificationProps {
	message: string;
	// duration?: number;
	closable?: boolean;
	onClose?: () => void;
	onCancel?: () => void;
	icon?: string;
}

export const Notification: FC<NotificationProps> = memo(
	({
		message,
		// duration = 5000,
		closable = true,
		onClose,
		onCancel,
		icon,
	}) => {
		const [visible, setVisible] = useState(true);

		// useEffect(() => {
		// 	const timer = setTimeout(() => {
		// 		setVisible(false);
		// 		if (onClose) onClose();
		// 	}, duration);

		// 	return () => clearTimeout(timer);
		// }, []);

		const handleClose = () => {
			setVisible(false);
			if (onClose) onClose();
		};

		const handleCancel = () => {
			setVisible(false);
			if (onCancel) onCancel();
		};

		return (
			<article className={cl(cls.Notification, { [cls.Hide]: !visible }, [])}>
				<div className={cls.Content}>
					{icon && (
						<Image
							width={20}
							height={20}
							src={icon}
							alt='icon'
							className={`${cls.Icon} noselect`}
						/>
					)}
					<p>{message}</p>
				</div>
				{closable && (
					<Button
						padding='none'
						slice
						className='animation-click'
						onClick={handleClose}
					>
						<Image
							src='/images/icons/cross.svg'
							alt='Иконка крестика'
							width={12}
							height={12}
						/>
					</Button>
				)}
				{onCancel && (
					<Button className='animation-click' onClick={handleCancel}>
						Cancel
					</Button>
				)}
			</article>
		);
	},
);

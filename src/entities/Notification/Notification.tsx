'use client';

import { Button } from '@/shared/ui/Button';
import { Progress } from '@nextui-org/react';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
	CSSProperties,
	FC,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react';
import cls from './Notification.module.scss';

interface NotificationProps {
	message: string;
	duration?: number;
	closable?: boolean;
	onClose?: () => void;
	onCancel?: () => void;
	icon?: string;
}

export const Notification: FC<NotificationProps> = memo(
	({ message, duration = 7000, closable = true, onClose, onCancel, icon }) => {
		const t = useTranslations('Notification');
		const [visible, setVisible] = useState(true);
		const [closing, setClosing] = useState(false);

		const handleClose = useCallback(() => {
			setClosing(true);
			setTimeout(() => {
				setVisible(false);
				setClosing(false);
				if (onClose) onClose();
			}, 300); // Animation duration
		}, [onClose]);

		useEffect(() => {
			const timer = setTimeout(() => {
				handleClose();
			}, duration);
			return () => clearTimeout(timer);
		}, [duration, handleClose]);

		const handleCancel = () => {
			setClosing(true);
			setTimeout(() => {
				setVisible(false);
				setClosing(false);
				if (onCancel) onCancel();
			}, 300); // Animation duration
		};

		if (!visible) {
			return null;
		}

		return (
			<article
				className={cn(cls.notification, {
					[cls.closing]: closing,
				})}
				style={
					{
						'--animation-duration-notification': `${duration}ms`,
					} as CSSProperties
				}
			>
				<Progress
					className={cls.progress}
					size='sm'
					aria-label='Loading...'
					color='success'
					// value={progressValue}
				/>
				<div className={cls.content}>
					{icon && (
						<Image
							width={20}
							height={20}
							src='/images/icons/bookmark-fill.svg'
							alt={t('icon')}
							className={`${cls.icon} noselect`}
						/>
					)}
					<p>{message}</p>
				</div>
				{closable && (
					<Button slice className='rounded-lg py-0 px-0' onClick={handleClose}>
						<Image
							src='/images/icons/cross.svg'
							alt={t('icon-cross')}
							width={12}
							height={12}
						/>
					</Button>
				)}
				{onCancel && <Button onClick={handleCancel}>{t('close')}</Button>}
			</article>
		);
	},
);

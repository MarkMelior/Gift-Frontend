'use client';

import { BookmarkIcon } from '@/shared/assets/icon/Bookmark';
import { CrossIcon } from '@/shared/assets/icon/Cross';
import { Button } from '@/shared/ui/Button';
import { Progress } from '@nextui-org/react';
import cn from 'clsx';
import {
	CSSProperties,
	FC,
	TouchEvent,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react';
import cls from './Notification.module.scss';

interface NotificationProps {
	message: string;
	duration?: number;
	animationCloseDuration?: number;
	closable?: boolean;
	onClose?: () => void;
	onCancel?: () => void;
	icon?: string;
}

export const Notification: FC<NotificationProps> = memo(
	({
		message,
		duration = 7000,
		animationCloseDuration = 300,
		closable = true,
		onClose,
		onCancel,
		icon,
	}) => {
		const [visible, setVisible] = useState(true);
		const [closing, setClosing] = useState(false);
		const [touchStartX, setTouchStartX] = useState(0);
		const [touchEndX, setTouchEndX] = useState(0);
		const [swipeClose, setSwipeClose] = useState(false);

		const handleClose = useCallback(() => {
			setClosing(true);
			setTimeout(() => {
				setVisible(false);
				setClosing(false);
				if (onClose) onClose();
			}, animationCloseDuration);
		}, [animationCloseDuration, onClose]);

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
			}, animationCloseDuration);
		};

		const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
			setTouchStartX(e.touches[0].clientX);
		};

		const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
			setTouchEndX(e.touches[0].clientX);
		};

		const handleTouchEnd = () => {
			const deltaX = touchEndX - touchStartX;

			// Set threshold for swipe action
			const threshold = 100;

			if (Math.abs(deltaX) > threshold) {
				setSwipeClose(true);
				setTimeout(() => {
					setSwipeClose(false);
					setVisible(false);
					if (onClose) onClose();
				}, animationCloseDuration);
			}
		};

		if (!visible) {
			return null;
		}

		return (
			<article
				className={cn(cls.wrapper, {
					[cls.closing]: closing,
					[cls.swipeLeft]: swipeClose && touchEndX < touchStartX && !closing,
					[cls.swipeRight]: swipeClose && touchEndX > touchStartX && !closing,
				})}
				style={
					{
						'--animation-duration-notification': `${duration}ms`,
						'--animation-close-duration-notification': `${animationCloseDuration}ms`,
					} as CSSProperties
				}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<Progress
					className={cls.progress}
					size='sm'
					aria-label='Loading...'
					color='success'
				/>
				<div className={cls.content}>
					{icon && <BookmarkIcon className={cn(cls.icon, 'noselect')} />}
					<p>{message}</p>
				</div>
				{closable && (
					<Button slice className='rounded-lg py-0 px-0' onClick={handleClose}>
						<CrossIcon />
					</Button>
				)}
				{onCancel && <Button onClick={handleCancel}>Закрыть</Button>}
			</article>
		);
	},
);

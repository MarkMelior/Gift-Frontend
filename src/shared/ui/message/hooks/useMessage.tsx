'use client';

import { Progress, cn } from '@nextui-org/react';
import { CSSProperties, useState } from 'react';
import { Button } from '../../button';
import cls from '../ui/message-list.module.scss';

interface MessageOptions {
	id: number;
	content: string;
	animationCloseDuration?: number;
	duration?: number;
	type?: 'info' | 'success' | 'error';
	onClose?: () => void;
	onCancel?: () => void;
	startContent?: JSX.Element;
	closing?: boolean;
}

export const useMessage = () => {
	const [messages, setMessages] = useState<MessageOptions[]>([]);

	const showMessage = (props: Omit<MessageOptions, 'id'>) => {
		const { animationCloseDuration = 300, duration = 2500 } = props;
		const newMessage: MessageOptions = {
			id: Date.now(),
			...props,
			duration,
			animationCloseDuration,
		};
		setMessages((prevMessages) => [...prevMessages, newMessage]);

		// Удаление сообщения через N секунд
		const timeoutId = setTimeout(() => {
			removeMessage(newMessage.id, animationCloseDuration);
		}, duration);

		return () => clearTimeout(timeoutId);
	};

	const removeMessage = (id: number, animationCloseDuration: number) => {
		setMessages((prevMessages) =>
			prevMessages.map((message) => {
				if (message.id === id) {
					return {
						...message,
						closing: true,
					};
				}
				return message;
			}),
		);

		const timeoutId = setTimeout(() => {
			setMessages((prevMessages) =>
				prevMessages.filter((message) => message.id !== id),
			);
		}, animationCloseDuration);

		return () => clearTimeout(timeoutId);
	};

	const contextMessages = (
		<div className={cls.wrapper}>
			{messages.map(
				({
					id,
					content,
					animationCloseDuration = 300,
					duration,
					startContent,
					closing,
					onCancel,
				}) => (
					<article key={id} className='relative'>
						<div
							className={cn(cls.message, {
								[cls.closing]: closing,
							})}
							style={
								{
									'--animation-duration-notification': `${duration}ms`,
									'--animation-close-duration-notification': `${animationCloseDuration}ms`,
								} as CSSProperties
							}
							onClick={() => removeMessage(id, animationCloseDuration)}
						>
							<Progress
								className={cls.progress}
								size='sm'
								aria-label='Loading...'
								color='success'
							/>
							<div className={cls.content}>
								<div className={cls.startContent}>{startContent}</div>
								<p>{content}</p>
							</div>
							{onCancel && (
								<Button
									slice
									className={cls.cancel}
									onClick={() => {
										onCancel();
										removeMessage(id, animationCloseDuration);
									}}
								>
									Отменить
								</Button>
							)}
						</div>
					</article>
				),
			)}
		</div>
	);

	return { showMessage, contextMessages };
};

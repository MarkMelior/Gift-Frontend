'use client';

import { Progress, cn } from '@nextui-org/react';
import {
	CSSProperties,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';
import cls from '../ui/message-list.module.scss';

type MessageType = 'info' | 'success' | 'error';

interface MessageOptions {
	id: number;
	content: string;
	type?: MessageType;
	animationCloseDuration?: number;
	duration?: number;
	onClose?: () => void;
	onCancel?: () => void;
	startContent?: JSX.Element;
	closing?: boolean;
}

interface MessageContextProps {
	showMessage: (props: Omit<MessageOptions, 'id'>) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(
	undefined,
);

export const useMessage = (): MessageContextProps => {
	const context = useContext(MessageContext);
	if (!context) {
		throw new Error('useMessage must be used within a MessageProvider');
	}
	return context;
};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
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

	const getTypeIcon = (type: MessageType) => {
		switch (type) {
			case 'info':
				return <FaCircleInfo size={16} className='text-blue-500' />;
			case 'success':
				return <FaCheckCircle size={16} className='text-green-500' />;
			case 'error':
				return <MdError size={20} className='text-red-500' />;
			default:
				return null;
		}
	};

	return (
		<MessageContext.Provider value={{ showMessage }}>
			{children}
			<div className={cls.wrapper}>
				{messages.map(
					({
						id,
						content,
						animationCloseDuration = 300,
						duration,
						startContent,
						closing,
						type = 'info',
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
									<div className={cls.startContent}>
										{startContent ? startContent : getTypeIcon(type)}
									</div>
									<p>{content}</p>
								</div>
								{onCancel && (
									<button
										className={cls.cancel}
										onClick={(e) => {
											e.stopPropagation();
											onCancel();
											removeMessage(id, animationCloseDuration);
										}}
									>
										Отменить
									</button>
								)}
							</div>
						</article>
					),
				)}
			</div>
		</MessageContext.Provider>
	);
};

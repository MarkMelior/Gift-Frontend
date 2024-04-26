import { cn } from '@/shared/lib/features';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import cls from './error-screen.module.scss';

interface ErrorScreenProps {
	title?: string;
	description?: string;
	image?: ReactNode;
	className?: string;
	fullHeight?: boolean;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
	title = 'Упс! Попробуйте обновить страницу',
	description = 'Неизвестная ошибка',
	image = (
		<Image
			src='/images/error/search.png'
			width={512}
			height={512}
			alt='error'
		/>
	),
	className,
	fullHeight,
}) => {
	return (
		<div
			className={cn(cls.wrapper, 'py-14', className, {
				[cls.fullHeight]: fullHeight,
			})}
		>
			<div className={cls.image}>{image}</div>
			<div className={cls.text}>
				<h6 className={cls.title}>{title}</h6>
				<p className={cls.description}>{description}</p>
			</div>
		</div>
	);
};

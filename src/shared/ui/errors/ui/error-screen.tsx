import { cn } from '@/shared/lib/features';
import { FC, ReactNode } from 'react';
import { ErrorDataKey, errorsData } from '../model/errors-data';
import cls from './error-screen.module.scss';

interface ErrorScreenProps {
	title?: string;
	description?: string;
	image?: ReactNode;
	className?: string;
	fullHeight?: boolean;
	typeError?: ErrorDataKey;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
	typeError = 'default',
	className,
	fullHeight,
}) => {
	const errorData = errorsData.find((error) => error.key === typeError)!;

	return (
		<div
			className={cn(cls.wrapper, 'py-14', className, {
				[cls.fullHeight]: fullHeight,
			})}
		>
			<div className={cls.image}>
				<img src={`/images/error/${errorData.image}`} alt='error' />
			</div>
			<div className={cls.text}>
				<h6 className={cls.title}>{errorData.title}</h6>
				<p className={cls.description}>{errorData.description}</p>
			</div>
		</div>
	);
};

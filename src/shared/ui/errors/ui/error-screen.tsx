import { cn } from '@/shared/lib/features';
import { FC } from 'react';
import { ErrorDataKey, errorsData } from '../model/errors-data';
import cls from './error-screen.module.scss';

interface ErrorScreenProps {
	className?: string;
	fullHeight?: boolean;
	typeError?: ErrorDataKey;
	description?: string;
}

export const ErrorScreen: FC<ErrorScreenProps> = ({
	typeError = 'default',
	description,
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
				<p className={cls.description}>
					{description || errorData.description}
				</p>
			</div>
		</div>
	);
};

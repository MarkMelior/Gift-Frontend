import cn from 'clsx';
import { FC, ReactNode } from 'react';
import cls from './background-color-spin.module.scss';

interface BackgroundColorSpinProps {
	children: ReactNode;
	className: string;
}

export const BackgroundColorSpin: FC<BackgroundColorSpinProps> = (
	{ children, className },
	props,
) => {
	return (
		<div className={cls.wrapper}>
			<div className={cn(cls.background, className)} {...props}>
				{children}
			</div>
		</div>
	);
};

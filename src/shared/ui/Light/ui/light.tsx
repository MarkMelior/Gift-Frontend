import cn from 'clsx';
import { FC } from 'react';
import cls from './light.module.scss';

interface LightProps {
	className?: string;
}

export const Light: FC<LightProps> = ({ className }) => {
	return (
		<div className={cn(cls.light, className, 'noselect')}>
			<span className={cls.ellipse1} />
			<span className={cls.ellipse2} />
			<span className={cls.ellipse3} />
		</div>
	);
};

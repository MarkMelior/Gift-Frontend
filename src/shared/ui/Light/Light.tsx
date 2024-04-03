import cn from 'clsx';
import { FC, memo } from 'react';
import cls from './Light.module.scss';

interface LightProps {
	className?: string;
}

export const Light: FC<LightProps> = memo(({ className }) => {
	return (
		<div className={cn(cls.light, className, 'noselect')}>
			<span className={cls.ellipse1} />
			<span className={cls.ellipse2} />
			<span className={cls.ellipse3} />
		</div>
	);
});

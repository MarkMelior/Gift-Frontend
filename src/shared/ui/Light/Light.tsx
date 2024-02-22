import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { FC } from 'react';
import cls from './Light.module.scss';

interface LightProps {
	className?: string;
}

export const Light: FC<LightProps> = ({ className = '' }) => {
	return (
		<div className={cl(cls.Light, {}, [className, 'noselect'])}>
			<span className={cls.Ellipse1} />
			<span className={cls.Ellipse2} />
			<span className={cls.Ellipse3} />
		</div>
	);
};

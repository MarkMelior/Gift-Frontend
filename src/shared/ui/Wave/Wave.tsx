import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { CSSProperties, FC } from 'react';
import cls from './Wave.module.scss';

interface WaveProps {
	className?: string;
	style?: CSSProperties;
}

export const Wave: FC<WaveProps> = ({ className = '', style }) => {
	return (
		<div
			className={cl(cls.container, {}, [className, 'noselect'])}
			style={style}
		>
			<div className={cls.wrap}>
				<div className={cls.object} />
				<div className={cls.object} />
			</div>
		</div>
	);
};

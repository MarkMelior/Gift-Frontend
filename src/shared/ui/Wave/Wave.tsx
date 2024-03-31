'use client';

import { getSettingsOptimization } from '@/features/Settings';
import { MediaSize } from '@/shared/const';
import cn from 'clsx';
import { CSSProperties, FC } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import cls from './Wave.module.scss';

interface WaveProps {
	className?: string;
	style?: CSSProperties;
}

export const Wave: FC<WaveProps> = ({ className, style }) => {
	const isPhone = useMediaQuery({ maxWidth: MediaSize.MD });
	const isOptimization = useSelector(getSettingsOptimization);

	if (isPhone) {
		return null;
	}

	return (
		<div
			data-optimization={isOptimization}
			className={cn(cls.container, className, 'noselect')}
			style={style}
		>
			<div className={cls.wrap}>
				<div className={cls.object} />
				<div className={cls.object} />
			</div>
		</div>
	);
};

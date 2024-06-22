'use client';

import { useSettings } from '@/shared/config/settings';
import { MediaSize } from '@/shared/const';
import cn from 'clsx';
import { CSSProperties, FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './wave.module.scss';

interface WaveProps {
	className?: string;
	style?: CSSProperties;
}

export const Wave: FC<WaveProps> = ({ className, style }) => {
	const isPhone = useMediaQuery({ maxWidth: MediaSize.MD });
	const { optimization } = useSettings();

	if (isPhone) return <></>;

	return (
		<div
			data-optimization={optimization}
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

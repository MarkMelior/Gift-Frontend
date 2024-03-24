'use client';

import { MediaSize } from '@/shared/const/mediaSize';
import cn from 'clsx';
import { CSSProperties, FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './Wave.module.scss';

interface WaveProps {
	className?: string;
	style?: CSSProperties;
}

export const Wave: FC<WaveProps> = ({ className, style }) => {
	const isPhone = useMediaQuery({ query: `(max-width: ${MediaSize.SM}px)` });

	if (isPhone) {
		return null;
	}

	return (
		<div className={cn(cls.container, className, 'noselect')} style={style}>
			<div className={cls.wrap}>
				<div className={cls.object} />
				<div className={cls.object} />
			</div>
		</div>
	);
};

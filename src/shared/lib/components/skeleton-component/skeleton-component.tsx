'use client';

import { FC, ReactNode, memo, useEffect, useState } from 'react';

export interface SkeletonComponentProps {
	children: ReactNode;
	skeletonCount?: number;
	delay?: number;
}

export const SkeletonComponent: FC<SkeletonComponentProps> = memo(
	({ children, skeletonCount = 4, delay = 300 }) => {
		const [isTime, setIsTime] = useState(false);

		useEffect(() => {
			const timer = setTimeout(() => {
				setIsTime(true);
			}, delay);

			return () => clearTimeout(timer);
		}, [delay]);

		const renderSkeletons = () => {
			return Array.from({ length: skeletonCount }, () => children);
		};

		return isTime && <>{renderSkeletons()}</>;
	},
);

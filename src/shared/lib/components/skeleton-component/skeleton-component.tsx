'use client';

import { FC, ReactNode } from 'react';
import { useDelay } from '../../hooks';

export interface SkeletonComponentProps {
	children: ReactNode;
	skeletonCount?: number;
	delay?: number;
}

export const SkeletonComponent: FC<SkeletonComponentProps> = ({
	children,
	skeletonCount = 4,
	delay = 300,
}) => {
	const isTime = useDelay(delay);

	const renderSkeletons = () => {
		return Array.from({ length: skeletonCount }, () => children);
	};

	return isTime && <>{renderSkeletons()}</>;
};

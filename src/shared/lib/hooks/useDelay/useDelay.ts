'use client';

import { useEffect, useState } from 'react';

export const useDelay = (delay: number = 3000) => {
	const [isTime, setIsTime] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsTime(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	return isTime;
};

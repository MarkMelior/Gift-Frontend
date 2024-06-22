import { Skeleton } from '@nextui-org/react';
import { FC } from 'react';

export const CardWideSkeleton: FC = () => {
	return (
		<Skeleton className='cursor-wait min-w-[304px] h-[200px] p-5 rounded-md' />
	);
};

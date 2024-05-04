import { Skeleton } from '@nextui-org/react';
import { FC, memo } from 'react';

export const CardWideSkeleton: FC = memo(() => {
	return (
		<Skeleton className='cursor-wait min-w-[304px] h-[200px] p-5 rounded-md' />
	);
});

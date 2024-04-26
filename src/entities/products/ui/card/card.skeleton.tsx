import { SkeletonComponent } from '@/shared/lib/components';
import { Skeleton } from '@nextui-org/react';
import { FC, memo } from 'react';

export const CardSkeleton: FC = memo(() => {
	return (
		<SkeletonComponent delay={300} skeletonCount={4}>
			<div className='grid gap-1 cursor-wait'>
				<Skeleton className='h-[290px] rounded-lg' />
				<div className='flex gap-2 items-center h-6'>
					<Skeleton className='w-8 h-4 rounded-md' />
					<Skeleton className='w-16 h-4 rounded-md' />
				</div>
				<div className='h-10 flex flex-col gap-2'>
					<Skeleton className='w-full h-2 rounded-full' />
					<Skeleton className='w-24 h-2 rounded-full' />
				</div>
				<Skeleton className='w-16 h-4 rounded-full' />
				<div className='flex justify-between items-center'>
					<Skeleton className='w-24 h-4 rounded-full' />
					<Skeleton className='w-9 h-9 rounded-full' />
				</div>
			</div>
		</SkeletonComponent>
	);
});

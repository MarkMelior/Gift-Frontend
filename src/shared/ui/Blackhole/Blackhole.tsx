'use client';

import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import cn from 'clsx';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './Blackhole.module.scss';

interface BlackholeProps {
	className?: string;
	flip?: boolean;
}

export const Blackhole: FC<BlackholeProps> = ({ className = '', flip }) => {
	const [mounted, setMounted] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: MediaSize.LG });

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			className={cn(cls.wrapper, { [cls.flip]: flip }, className, 'noselect')}
		>
			<div className={cls.circles}>
				<div />
				<div />
				<div />
			</div>
			{isMobile ? (
				<Image
					src='/images/pages/blackhole.png'
					alt='Blackhole'
					width={3840}
					height={2160}
					className={`${cls.video} noselect`}
				/>
			) : (
				<video
					autoPlay
					loop
					muted
					playsInline
					className={`${cls.video} noselect`}
				>
					<source src='/videos/blackhole.webm' />
				</video>
			)}
		</div>
	);
};

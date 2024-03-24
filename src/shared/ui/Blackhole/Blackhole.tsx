'use client';

import { getSettings } from '@/app/providers/StoreProvider';
import { MediaSize } from '@/shared/const/mediaSize';
import cn from 'clsx';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import cls from './Blackhole.module.scss';

interface BlackholeProps {
	className?: string;
	flip?: boolean;
	disabledOnMobile?: boolean;
}

export const Blackhole: FC<BlackholeProps> = ({
	className = '',
	flip,
	disabledOnMobile,
}) => {
	const [mounted, setMounted] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: MediaSize.MD });
	const isAnimations = useSelector(getSettings('animations'));

	useEffect(() => {
		setMounted(true);
	}, []);

	if ((isMobile && disabledOnMobile) || !mounted) {
		return null;
	}

	return (
		<div
			className={cn(
				cls.wrapper,
				'content',
				{ [cls.flip]: flip },
				className,
				'noselect',
			)}
		>
			<div className={cls.circles}>
				<div />
				<div />
				<div />
			</div>
			{isMobile || !isAnimations ? (
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

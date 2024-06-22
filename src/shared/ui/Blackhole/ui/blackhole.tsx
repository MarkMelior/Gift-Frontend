'use client';

import { useSettings } from '@/shared/config/settings';
import { MediaSize } from '@/shared/const';
import cn from 'clsx';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './blackhole.module.scss';

interface BlackholeProps {
	className?: string;
	flip?: boolean;
	disabledOnMobile?: boolean;
}

export const Blackhole: FC<BlackholeProps> = ({
	className,
	flip,
	disabledOnMobile,
}) => {
	const [mounted, setMounted] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: MediaSize.MD });
	const { optimization } = useSettings();

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
			{isMobile || optimization ? (
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

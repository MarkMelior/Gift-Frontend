'use client';

import cn from 'clsx';
import { FC, useEffect, useState } from 'react';
import cls from './Blackhole.module.scss';

interface BlackholeProps {
	className?: string;
	flip?: boolean;
}

export const Blackhole: FC<BlackholeProps> = ({ className = '', flip }) => {
	const [mounted, setMounted] = useState(false);

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
			<video
				autoPlay
				loop
				muted
				playsInline
				className={`${cls.video} noselect`}
			>
				<source src='/videos/blackhole.webm' />
			</video>
		</div>
	);
};

import { Logo as SvgLogo } from '@/shared/assets/icon/Logo';
import cn from 'clsx';
import { FC } from 'react';
import cls from './Logo.module.scss';

interface LogoProps {
	className?: string;
	scale?: number;
	opacity?: number;
}

export const Logo: FC<LogoProps> = ({ className = '', scale = 1, opacity }) => {
	return (
		<div
			className={cn(cls.logo, className)}
			style={{
				opacity,
				transform: `scale(${scale})`,
			}}
		>
			<SvgLogo />
		</div>
	);
};

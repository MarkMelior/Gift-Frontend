import { Logo as SvgLogo } from '@/shared/assets/icon/Logo';
import cn from 'clsx';
import { FC } from 'react';
import cls from './Logo.module.scss';

interface LogoProps {
	className?: string;
	scale?: number;
	opacity?: number;
	width?: string;
	height?: string;
}

export const Logo: FC<LogoProps> = ({
	className,
	scale = 1,
	opacity,
	width,
	height,
}) => {
	return (
		<div
			className={cn(cls.logo, className)}
			style={{
				opacity,
				transform: `scale(${scale})`,
				width,
				height,
			}}
		>
			<SvgLogo />
		</div>
	);
};

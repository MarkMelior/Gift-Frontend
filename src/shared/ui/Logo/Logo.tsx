import cn from 'clsx';
import IconLogo from 'public/images/icons/logo-melior-white.svg';
import { FC } from 'react';
import cls from './Logo.module.scss';

interface LogoProps {
	className?: string;
	scale?: number;
	opacity?: number;
}

export const Logo: FC<LogoProps> = ({ className = '', scale = 1, opacity }) => {
	return (
		// <Image
		// 	className={cl(cls.Logo, {}, [className])}
		// 	src='/images/icons/logo-melior-white.svg'
		// 	alt='Easy Gift Logo'
		// 	width={size}
		// 	height={size}
		// 	{...otherProps}
		// />
		<div
			className={cn(cls.logo, className)}
			style={{
				opacity,
				transform: `scale(${scale})`,
			}}
		>
			<IconLogo />
		</div>
	);
};

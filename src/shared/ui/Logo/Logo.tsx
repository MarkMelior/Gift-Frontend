import { classNames as cl } from '@/shared/lib/classNames/classNames';
import IconLogo from 'public/images/icons/logo-melior-white.svg';
import { FC } from 'react';
import cls from './Logo.module.scss';

interface LogoProps {
	className?: string;
	size?: number;
}

export const Logo: FC<LogoProps> = ({
	className = '',
	size = 48,
	...otherProps
}) => {
	return (
		// <Image
		// 	className={cl(cls.Logo, {}, [className])}
		// 	src='/images/icons/logo-melior-white.svg'
		// 	alt='Easy Gift Logo'
		// 	width={size}
		// 	height={size}
		// 	{...otherProps}
		// />
		<div className={cl(cls.Logo, {}, [className])}>
			<IconLogo />
		</div>
	);
};

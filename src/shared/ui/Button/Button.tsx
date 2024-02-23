'use client';

import { classNames as cl, Mods } from '@/shared/lib/classNames/classNames';
import {
	ButtonHTMLAttributes,
	ForwardedRef,
	forwardRef,
	ReactNode,
	useRef,
} from 'react';
import { useRippleAnimation } from '../RippleEffect';
import { RippleConfigProps } from '../RippleEffect/useRippleAnimation';
import cls from './Button.module.scss';

export type ButtonVariant = 'layer' | 'slice' | 'default';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonPadding =
	| 'padding-small'
	| 'padding-medium'
	| 'padding-large'
	| 'padding-none';
export type ButtonRadius =
	| 'radius-full'
	| 'radius-large'
	| 'radius-medium'
	| 'radius-small'
	| 'radius-none';

export type ButtonColor = 'normal' | 'success' | 'error';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;

	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	disabled?: boolean;
	fullWidth?: boolean;

	radius?: ButtonRadius;
	padding?: ButtonPadding;
	rippleConfig?: RippleConfigProps;

	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export const Button = forwardRef(
	(
		{
			className = '',
			children,
			variant = 'default',
			fullWidth,
			disabled,
			rippleConfig,
			padding = 'padding-medium',
			size = 'medium',
			radius = 'radius-medium',
			// isLoading,
			color = 'normal',
			...otherProps
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		const mods: Mods = {
			[cls.disabled]: disabled,
			[cls.fullWidth]: fullWidth,
		};

		ref = useRef<HTMLButtonElement>(null);
		useRippleAnimation(ref, rippleConfig);

		return (
			<button
				type='button'
				className={cl(cls.Button, mods, [
					className,
					cls[variant],
					cls[size],
					cls[radius],
					cls[padding],
					cls[color],
				])}
				disabled={disabled}
				ref={ref}
				{...otherProps}
			>
				{variant === 'layer' && (
					<div className={cl(cls.layerInner, {}, [cls[radius], cls[padding]])}>
						<div className={cls.Starlight} />
						<div className={cls.Starlight} />
						{children}
					</div>
				)}

				{variant !== 'layer' && children}
			</button>
		);
	},
);

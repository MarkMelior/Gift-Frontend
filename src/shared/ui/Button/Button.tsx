'use client';

import { classNames as cl, Mods } from '@/shared/lib/classNames/classNames';
import { Size } from '@/shared/types/ui';
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

export type ButtonVariant = 'layer' | 'default' | 'hero' | 'glowing' | 'flat';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;

	variant?: ButtonVariant;
	fontSize?: Size;
	disabled?: boolean;
	fullWidth?: boolean;

	slice?: boolean;
	lines?: boolean;
	clear?: boolean;

	radius?: Size;
	padding?: Size;
	rippleConfig?: RippleConfigProps;

	// color?: Color;

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
			slice,
			lines,
			rippleConfig,
			padding = 'md',
			fontSize = 'md',
			radius = 'md',
			// isLoading,
			// color,
			...otherProps
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		const mods: Mods = {
			[cls.disabled]: disabled,
			[cls.fullWidth]: fullWidth,
			[cls.slice]: slice,
			[cls.Glowing]: variant === 'glowing',
		};

		ref = useRef<HTMLButtonElement>(null);
		useRippleAnimation(ref, rippleConfig);

		const button = (
			<button
				type='button'
				className={cl(cls.Button, mods, [
					className,
					cls[variant],
					cls[`fontSize-${fontSize}`],
					cls[`radius-${radius}`],
					cls[`padding-${padding}`],
				])}
				disabled={disabled}
				ref={ref}
				{...otherProps}
			>
				{variant === 'layer' && (
					<div
						className={cl(cls.layerInner, {}, [
							cls[`radius-${radius}`],
							cls[`padding-${padding}`],
						])}
					>
						<div className={cls.Starlight} />
						<div className={cls.Starlight} />
						{children}
					</div>
				)}

				{variant === 'glowing' && (
					<>
						<div className={cls.Animation}>
							<div className={cls.Glow} />
							<div className={cls.StarsMask}>
								<div className={cls.Stars} />
							</div>
						</div>
						<div className={cl(cls.BorderMask, {}, [cls[`radius-${radius}`]])}>
							<div className={cls.Border} />
						</div>
						<div
							className={cl(cls.Button, {}, [
								cls[`radius-${radius}`],
								cls[`padding-${padding}`],
							])}
						>
							{children}
						</div>
					</>
				)}

				{lines && (
					<>
						<div className={cls.SquareItem}>
							<div />
						</div>
						<div className={cls.SquareItem}>
							<div />
						</div>
						<div className={cls.SquareItem}>
							<div />
						</div>
					</>
				)}

				{variant !== 'layer' && variant !== 'glowing' && children}
			</button>
		);

		return button;
	},
);

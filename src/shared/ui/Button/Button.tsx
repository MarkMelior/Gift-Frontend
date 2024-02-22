import { classNames as cl, Mods } from '@/shared/lib/classNames/classNames';
import {
	ButtonHTMLAttributes,
	ForwardedRef,
	forwardRef,
	ReactNode,
} from 'react';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'layer' | 'slice' | 'default';
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
	/**
	 * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
	 */
	variant?: ButtonVariant;
	/**
	 * Размер кнопки в соответствии с дизайн системой
	 */
	size?: ButtonSize;
	/**
	 * Флаг, отвечающий за работу кнопки
	 */
	disabled?: boolean;
	/**
	 * Содержимое кнопки
	 */
	children?: ReactNode;
	/**
	 * Увеличивает кнопку на всю свободную ширину
	 */
	fullWidth?: boolean;

	radius?: ButtonRadius;
	padding?: ButtonPadding;

	leftIcon?: ReactNode;
	rightIcon?: ReactNode;

	color?: ButtonColor;
}

export const Button = forwardRef(
	(
		{
			className = '',
			children,
			variant = 'clear',
			fullWidth,
			disabled,
			padding = 'padding-medium',
			size = 'medium',
			radius = 'radius-medium',
			leftIcon,
			rightIcon,
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
				{...otherProps}
				ref={ref}
			>
				{leftIcon && <span className={cls.Icon}>{leftIcon}</span>}
				{variant === 'layer' ? (
					<div className={cl(cls.layerInner, {}, [cls[radius]])}>
						{children}
					</div>
				) : (
					children
				)}
				{rightIcon && <span className={cls.Icon}>{rightIcon}</span>}
			</button>
		);
	},
);

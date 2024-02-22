import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
	ButtonHTMLAttributes,
	ForwardedRef,
	forwardRef,
	ReactNode,
} from 'react';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'layer' | 'slice';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	/**
	 * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
	 */
	variant?: ButtonVariant;
	/**
	 * Флаг, делающий кнопку квадратной
	 */
	square?: boolean;
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

	color?: ButtonColor;
}

export const Button = forwardRef(
	(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
		const {
			className = '',
			children,
			variant = 'outline',
			square,
			disabled,
			fullWidth,
			size = 'm',
			color = 'normal',
			...otherProps
		} = props;

		const mods: Mods = {
			[cls.square]: square,
			[cls.disabled]: disabled,
			[cls.fullWidth]: fullWidth,
		};

		return (
			<button
				type='button'
				className={classNames(cls.Button, mods, [
					className,
					cls[variant],
					cls[size],
					cls[color],
				])}
				disabled={disabled}
				{...otherProps}
				ref={ref}
			>
				{children}
			</button>
		);
	},
);

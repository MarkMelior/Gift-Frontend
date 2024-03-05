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

export type ButtonVariant = 'layer' | 'hero' | 'glowing' | 'flat';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
	fullWidth?: boolean;
	isDisabled?: boolean;

	disableRipple?: boolean;
	rippleConfig?: RippleConfigProps;

	variant?: ButtonVariant;
	slice?: boolean;
	lines?: boolean;
	starlight?: boolean;
	clear?: boolean;

	fontSize?: Size;
	radius?: Size;
	padding?: Size;
	// color?: Color;

	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export const Button = forwardRef(
	(
		{
			className,
			children,
			fullWidth,
			isDisabled,
			// isLoading,

			variant,
			slice,
			lines,
			starlight,
			clear,
			// color,

			disableRipple = !!clear,
			rippleConfig,

			fontSize = !clear ? 'md' : undefined,
			radius = !clear ? 'md' : undefined,
			padding = !clear ? 'md' : undefined,

			...otherProps
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		ref = useRef<HTMLButtonElement>(null);
		useRippleAnimation(ref, {
			...rippleConfig,
			disabled: disableRipple,
		});

		const renderStarlight = () => (
			<>
				<div className={cls.Starlight} />
				<div className={cls.Starlight} />
			</>
		);

		const renderLayer = () => (
			<div
				className={cl(cls.layerInner, {}, [
					`radius-${radius}`,
					`padding-${padding}`,
				])}
			>
				{!starlight && renderStarlight()}
				{children}
			</div>
		);

		const renderGlowing = () => (
			<>
				<div className={cls.Animation}>
					<div className={cls.Glow} />
					<div className={cls.StarsMask}>
						<div className={cls.Stars} />
					</div>
				</div>
				<div className={cl(cls.BorderMask, {}, [`radius-${radius}`])}>
					<div className={cls.Border} />
				</div>
				<div
					className={cl(cls.Button, {}, [
						`radius-${radius}`,
						`padding-${padding}`,
					])}
				>
					{children}
				</div>
			</>
		);

		const renderLinesItem = () => (
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
		);

		const renderButtonContent = () => {
			if (variant === 'layer') return renderLayer();
			if (variant === 'glowing') return renderGlowing();
			// eslint-disable-next-line react/jsx-no-useless-fragment
			return <>{children}</>;
		};

		const buttonMods: Mods = {
			[cls.disabled]: isDisabled,
			[cls.fullWidth]: fullWidth,
			[cls.slice]: slice,
			[cls.default]: !clear,
			[cls.glowing]: variant === 'glowing',
			[`text-${fontSize}`]: fontSize,
			[`radius-${radius}`]: radius,
			[`padding-${padding}`]: padding,
		};

		const buttonClassName: string[] = [
			variant && cls[variant],
			className,
		].filter(Boolean) as string[];

		return (
			<button
				type='button'
				className={cl(cls.Button, buttonMods, buttonClassName)}
				disabled={isDisabled}
				ref={ref}
				{...otherProps}
			>
				{lines && renderLinesItem()}
				{renderButtonContent()}
				{starlight && renderStarlight()}
				{!disableRipple && <div className='RippleRoot' />}
			</button>
		);
	},
);

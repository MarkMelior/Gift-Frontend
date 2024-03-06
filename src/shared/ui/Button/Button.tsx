'use client';

import { classNames as cl, Mods } from '@/shared/lib/classNames/classNames';
import { Size } from '@/shared/types/ui';
import { Loader } from '@/widgets/Loader';
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

export type ButtonVariant =
	| 'layer'
	| 'hero'
	| 'glowing'
	| 'flat'
	| 'default'
	| 'gradient';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: ReactNode;
	fullWidth?: boolean;
	isLoading?: boolean;
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

	startContent?: ReactNode;
	endContent?: ReactNode;
}

export const Button = forwardRef(
	(
		{
			className,
			children,
			fullWidth,
			isLoading,
			isDisabled = isLoading,

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

			startContent,
			endContent,

			...otherProps
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		ref = useRef<HTMLButtonElement>(null);
		// const currentColor = useElementColor({ ref, disableRipple });

		useRippleAnimation(ref, {
			...rippleConfig,
			// color: currentColor,
			disabled: disableRipple,
		});

		if (isLoading && startContent) startContent = <Loader />;
		if (isLoading && endContent) endContent = <Loader />;

		const renderStarlight = () => (
			<>
				<div className={cls.Starlight} />
				<div className={cls.Starlight} />
			</>
		);

		const renderChildren = () => (
			<>
				{starlight && renderStarlight()}
				{startContent}
				{children}
				{endContent}
			</>
		);

		const renderLayer = () => (
			<div
				className={cl(cls.layerInner, {}, [
					`radius-${radius}`,
					`padding-${padding}`,
				])}
			>
				{renderChildren()}
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
					{renderChildren()}
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
			switch (variant) {
				case 'layer':
					return renderLayer();
				case 'glowing':
					return renderGlowing();
				default:
					return <>{renderChildren()}</>;
			}
		};

		const buttonMods: Mods = {
			[cls.disabled]: isDisabled,
			['fullWidth']: fullWidth,
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
				{!disableRipple && <div className='RippleRoot' />}
			</button>
		);
	},
);

'use client';

import { cn } from '@/shared/lib/tailwindMerge';
import { clsxMods } from '@/shared/types';
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
				<div className={cls.starlight} />
				<div className={cls.starlight} />
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
			<div className={cn(cls.layerInner, className)}>{renderChildren()}</div>
		);

		const renderGlowing = () => (
			<>
				<div className={cls.animation}>
					<div className={cls.glow} />
					<div className={cls.starsMask}>
						<div className={cls.stars} />
					</div>
				</div>
				<div className={cn(cls.borderMask)}>
					<div className={cls.border} />
				</div>
				<div className={cn(cls.button, cls.inherit)}>{renderChildren()}</div>
			</>
		);

		const renderLinesItem = () => (
			<>
				<div className={cls.squareItem}>
					<div />
				</div>
				<div className={cls.squareItem}>
					<div />
				</div>
				<div className={cls.squareItem}>
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

		const buttonMods: clsxMods = {
			[cls.disabled]: isDisabled,
			['fullWidth']: fullWidth,
			[cls.slice]: slice,
			[cls.default]: !clear,
			['py-2 px-4 rounded-lg']: !clear,
			[cls.glowing]: variant === 'glowing',
		};

		return (
			<button
				type='button'
				className={cn(
					cls.button,
					buttonMods,
					variant && cls[variant],
					className,
				)}
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

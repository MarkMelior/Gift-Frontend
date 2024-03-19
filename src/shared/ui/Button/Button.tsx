'use client';

import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { cn } from '@/shared/lib/tailwindMerge';
import { clsxMods } from '@/shared/types';
import {
	ButtonProps as BaseButtonProps,
	Ripple,
	Spinner,
	useButton,
} from '@nextui-org/react';
import { forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './Button.module.scss';

export type ButtonVariant =
	| 'layer'
	| 'hero'
	| 'glowing'
	| 'flat'
	| 'default'
	| 'gradient';

export interface ButtonProps extends BaseButtonProps {
	className?: string;
	disabled?: boolean;
	customVariant?: ButtonVariant;
	slice?: boolean;
	lines?: boolean;
	starlight?: boolean;
	clear?: boolean;
	hoverColor?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const {
			className,
			disabled,
			customVariant,
			slice,
			lines,
			starlight,
			clear,
			hoverColor,
		} = props;

		const {
			domRef,
			children,
			styles,
			spinnerSize,
			spinner = <Spinner color='current' size={spinnerSize} />,
			spinnerPlacement,
			startContent,
			endContent,
			isLoading,
			disableRipple,
			getButtonProps,
			getRippleProps,
			isIconOnly,
		} = useButton({
			ref,
			...props,
		});

		const isMobile = useMediaQuery({ minWidth: MediaSize.SM });

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
				{isLoading && spinnerPlacement === 'start' && spinner}
				{isLoading && isIconOnly ? null : children}
				{isLoading && spinnerPlacement === 'end' && spinner}
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
			switch (customVariant) {
				case 'layer':
					return renderLayer();
				case 'glowing':
					return renderGlowing();
				default:
					return <>{renderChildren()}</>;
			}
		};

		const buttonMods: clsxMods = {
			[cls.disabled]: disabled,
			[cls.slice]: slice,
			[cls.default]: !clear,
			'py-2 px-4 rounded-lg': !clear,
			[cls.glowing]: customVariant === 'glowing',
			[cls.hoverColor]: hoverColor,
		};

		return (
			<button
				type='button'
				className={cn(
					cls.button,
					buttonMods,
					customVariant && cls[customVariant],
					className,
				)}
				disabled={disabled}
				ref={domRef}
				style={{ '--hover-color-rgb': hoverColor }}
				{...getButtonProps()}
			>
				{lines && renderLinesItem()}
				{renderButtonContent()}
				{!disableRipple && isMobile && (
					<div className='rippleRoot'>
						<Ripple {...getRippleProps()} />
					</div>
				)}
			</button>
		);
	},
);

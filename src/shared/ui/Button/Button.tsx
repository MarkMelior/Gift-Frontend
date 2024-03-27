'use client';

import { getSettings } from '@/app/providers/StoreProvider';
import { MediaSize } from '@/shared/const';
import { cn } from '@/shared/lib/features';
import { clsxMods } from '@/shared/types/types';
import {
	ButtonProps as BaseButtonProps,
	Ripple,
	Spinner,
	useButton,
} from '@nextui-org/react';
import { CSSProperties, forwardRef } from 'react';
import { useSelector } from 'react-redux';
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
	isSelected?: boolean;
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
			isSelected,
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
		const isOptimization = useSelector(getSettings('optimization'));

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
			[cls.selected]: isSelected,
		};

		return (
			<button
				type='button'
				data-optimization={isOptimization}
				className={cn(
					cls.button,
					buttonMods,
					customVariant && cls[customVariant],
					className,
				)}
				disabled={disabled}
				ref={domRef}
				style={{ '--hover-color-rgb': hoverColor } as CSSProperties}
				{...getButtonProps()}
			>
				{lines && renderLinesItem()}
				{renderButtonContent()}
				{!disableRipple && !isOptimization && isMobile && (
					<div className='rippleRoot'>
						<Ripple {...getRippleProps()} />
					</div>
				)}
			</button>
		);
	},
);

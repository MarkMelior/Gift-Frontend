'use client';

import {
	AvatarIcon,
	AvatarProps as BaseAvatarProps,
	useAvatar,
} from '@nextui-org/react';
import cn from 'clsx';
import { forwardRef, useMemo } from 'react';
import cls from './Avatar.module.scss';

export interface AvatarProps extends BaseAvatarProps {}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
	const {
		src,
		icon = <AvatarIcon />,
		alt,
		classNames,
		slots,
		name,
		showFallback,
		fallback: fallbackComponent,
		getInitials,
		getAvatarProps,
		getImageProps,
	} = useAvatar({
		ref,
		...props,
	});

	const fallback = useMemo(() => {
		if (!showFallback && src) return null;

		const ariaLabel = alt || name || 'avatar';

		if (fallbackComponent) {
			return (
				<div
					aria-label={ariaLabel}
					className={slots.fallback({ class: classNames?.fallback })}
					role='img'
				>
					{fallbackComponent}
				</div>
			);
		}

		return name ? (
			<span
				aria-label={ariaLabel}
				className={slots.name({ class: classNames?.name })}
				role='img'
			>
				{getInitials(name)}
			</span>
		) : (
			<span
				aria-label={ariaLabel}
				className={slots.icon({ class: classNames?.icon })}
				role='img'
			>
				{icon}
			</span>
		);
	}, [
		showFallback,
		src,
		alt,
		name,
		fallbackComponent,
		slots,
		classNames?.name,
		classNames?.icon,
		classNames?.fallback,
		getInitials,
		icon,
	]);

	const { originalProps, ...avatarProps } = getAvatarProps(); // this line for fix error with originalProps

	// TODO: сделать чтобы можно было менять цвет при наведении, а не константа
	return (
		<div
			{...avatarProps}
			className={cn(
				avatarProps.className,
				cls.border,
				'click',
				'cursor-pointer',
			)}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			{src && <img {...getImageProps()} alt={alt} />}
			{fallback}
		</div>
	);
});

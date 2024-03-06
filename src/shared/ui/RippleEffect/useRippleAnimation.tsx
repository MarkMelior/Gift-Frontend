import { RefObject, useEffect } from 'react';
import cls from './RippleEffect.module.scss';

export interface RippleConfigProps {
	size?: number;
	color?: string;
	duration?: number;
	opacity?: number;
	disabled?: boolean;
}

export const useRippleAnimation = (
	element: RefObject<HTMLButtonElement>,
	config?: RippleConfigProps,
) => {
	const {
		size = 100,
		color = 'var(--color-main-inverted)',
		duration = 500,
		opacity = 0.3,
		disabled = false,
	} = config || {};

	if (disabled) return;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const button = element.current;
			if (!button) return;

			const rippleRoot = element.current.querySelector('.RippleRoot');
			if (!rippleRoot) return;
			rippleRoot.classList.add(cls.RippleRoot);

			const rect = button.getBoundingClientRect();
			const offsetX = e.clientX - rect.left;
			const offsetY = e.clientY - rect.top;
			const sizeOffset = 50;

			const span = document.createElement('span');
			span.classList.add(cls.RippleEffect);
			span.style.setProperty('--effect-duration', `${duration}ms`);
			span.style.setProperty('--effect-left', `${offsetX - sizeOffset}px`);
			span.style.setProperty('--effect-top', `${offsetY - sizeOffset}px`);
			span.style.setProperty('--effect-height', `${size}px`);
			span.style.setProperty('--effect-width', `${size}px`);
			span.style.setProperty('--effect-color', color);
			span.style.setProperty('--effect-opacity', String(opacity));

			rippleRoot.appendChild(span);

			setTimeout(() => {
				span.remove();
			}, duration);
		};

		element.current?.addEventListener('mouseup', onClick);

		const cleanup = element.current;

		return () => {
			cleanup?.removeEventListener('mouseup', onClick);
		};
	}, [color, disabled, duration, element, opacity, size]);
};

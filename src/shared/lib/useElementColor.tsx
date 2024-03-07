import { useEffect, useState } from 'react';

interface ElementColorHookOptions {
	ref: React.RefObject<HTMLElement>;
	disableRipple: boolean;
}

function getElementColor(element: HTMLElement | null): string | null {
	if (!element) return null;
	const computedStyle = window.getComputedStyle(element);
	return computedStyle.color;
}

export function useElementColor({
	ref,
	disableRipple,
}: ElementColorHookOptions): string | null {
	const [currentColor, setCurrentColor] = useState<string | null>(null);

	useEffect(() => {
		if (!disableRipple && ref.current) {
			const color = getElementColor(ref.current);
			setCurrentColor(color);
		}
	}, [ref, disableRipple]);

	return currentColor;
}

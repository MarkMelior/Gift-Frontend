'use client';

import { Theme } from '@/shared/types';
import { Button } from '@/shared/ui/Button';
import { useTheme } from 'next-themes';
import Moon from 'public/images/icons/moon.svg';
import { memo } from 'react';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
		setTheme(newTheme);
	};

	return (
		<Button slice onClick={toggleTheme} className={className}>
			<Moon />
		</Button>
	);
	// return (
	// 	<div onClick={toggleTheme} className={className}>
	// 		{children}
	// 	</div>
	// );
});

'use client';

import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import DarkIcon from 'public/images/icons/theme-dark.svg';
import LightIcon from 'public/images/icons/theme-light.svg';
import { memo } from 'react';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button type='button' onClick={toggleTheme} className={className}>
			{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
		</button>
	);
});

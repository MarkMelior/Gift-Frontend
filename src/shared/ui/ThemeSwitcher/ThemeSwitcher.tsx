'use client';

import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import DarkIcon from 'public/images/icons/theme-dark.svg';
import LightIcon from 'public/images/icons/theme-light.svg';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type='button'
			// theme={ButtonTheme.CLEAR}
			onClick={toggleTheme}
			className={classNames('', {}, [className || ''])}
		>
			{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
		</button>
	);
};

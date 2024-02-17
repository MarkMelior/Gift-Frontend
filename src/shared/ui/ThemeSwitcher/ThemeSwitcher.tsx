'use client';

import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

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

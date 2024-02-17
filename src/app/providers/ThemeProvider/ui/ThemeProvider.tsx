'use client';

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import {
	LOCAL_STORAGE_THEME_KEY,
	Theme,
	ThemeContext,
} from '../lib/ThemeContext';

interface ThemeProviderProps {
	children: ReactNode;
	initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
	const [theme, setTheme] = useState<Theme>(initialTheme || Theme.DARK);

	useEffect(() => {
		if (!initialTheme && typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
			if (savedTheme) {
				setTheme(savedTheme as Theme);
			}
		}
	}, []);

	const contextValue = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme, setTheme],
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;

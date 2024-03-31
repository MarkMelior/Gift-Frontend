'use client';

import { Theme } from '@/shared/types/theme';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export function ClientProviders({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeProvider attribute='class' defaultTheme={Theme.DARK}>
				<NextUIProvider>{children}</NextUIProvider>
			</ThemeProvider>
		</Provider>
	);
}

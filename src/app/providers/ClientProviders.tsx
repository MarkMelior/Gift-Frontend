'use client';

import { Theme } from '@/shared/types/theme';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';

export function ClientProviders({ children }: { children: ReactNode }) {
	return (
		<StoreProvider>
			<ThemeProvider attribute='class' defaultTheme={Theme.DARK}>
				<NextUIProvider>{children}</NextUIProvider>
			</ThemeProvider>
		</StoreProvider>
	);
}

'use client';

import { StoreProvider } from '@/app/store';
import { Theme } from '@/shared/types/theme';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { InitApp } from './init-app';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<StoreProvider>
			<ThemeProvider attribute='class' defaultTheme={Theme.DARK}>
				<NextUIProvider>
					<InitApp>{children}</InitApp>
				</NextUIProvider>
			</ThemeProvider>
		</StoreProvider>
	);
}

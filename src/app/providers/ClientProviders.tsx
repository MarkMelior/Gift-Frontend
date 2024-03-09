'use client';

import { Theme } from '@/shared/types';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute='class' defaultTheme={Theme.DARK}>
			<NextUIProvider>{children}</NextUIProvider>
		</ThemeProvider>
	);
}

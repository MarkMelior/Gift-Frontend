import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';

export function ServerProviders({ children }: { children: ReactNode }) {
	const messages = useMessages();

	return (
		<ThemeProvider>
			<NextIntlClientProvider messages={messages}>
				{children}
			</NextIntlClientProvider>
		</ThemeProvider>
	);
}

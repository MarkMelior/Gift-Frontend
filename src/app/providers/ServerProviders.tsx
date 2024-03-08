import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';

export function ServerProviders({ children }: { children: ReactNode }) {
	const messages = useMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}

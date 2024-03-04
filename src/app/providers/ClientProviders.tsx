'use client';

import { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>;
}

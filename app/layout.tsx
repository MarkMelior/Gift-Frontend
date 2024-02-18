import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<ThemeProvider>
					<Suspense fallback=''>{children}</Suspense>
				</ThemeProvider>
			</body>
		</html>
	);
}
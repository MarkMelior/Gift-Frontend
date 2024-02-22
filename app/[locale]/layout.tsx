import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import { locales } from '@/shared/config/i18n/config';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Light } from '@/shared/ui/Light';
import { PageLoader } from '@/shared/ui/PageLoader';
import { ScrollUp } from '@/shared/ui/ScrollUp';
import { Footer } from '@/widgets/Footer';
import { Navbar } from '@/widgets/Navbar';
import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

type RootLayoutProps = {
	children: ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params: { locale },
}: Omit<RootLayoutProps, 'children'>) {
	const t = await getTranslations({ locale });

	const metadata: Metadata = {
		title: t('RootLayout.title'),
		description: t('RootLayout.description'),
	};

	return metadata;
}

export default function RootLayout({
	children,
	params: { locale },
}: RootLayoutProps) {
	const messages = useMessages();

	return (
		<html lang={locale}>
			<body className={cl(inter.className, {}, [])}>
				<ThemeProvider>
					<NextIntlClientProvider messages={messages}>
						<Suspense fallback={<PageLoader />}>
							<Navbar blackhole />
							<Light />
							{children}
							{/* <SpaceCanvas /> */}
							<ScrollUp />
							<Footer />
						</Suspense>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

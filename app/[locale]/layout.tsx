import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import { Notification } from '@/entities/Notification';
import { locales } from '@/shared/config/i18n/config';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Light } from '@/shared/ui/Light';
import { SpaceCanvas } from '@/shared/ui/SpaceCanvas';
import { Footer } from '@/widgets/Footer';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { ScrollUp } from '@/widgets/ScrollUp';
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
							<Notification
								message='Добавьте наш сайт в закладки, чтобы не потерять'
								icon='/images/icons/bookmark-fill.svg'
							/>
							<SpaceCanvas />
							<ScrollUp />
							<Footer />
						</Suspense>
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

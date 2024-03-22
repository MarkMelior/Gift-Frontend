import { ClientProviders } from '@/app/providers/ClientProviders';
import { ServerProviders } from '@/app/providers/ServerProviders';
import '@/app/styles/index.scss';
import { Notification } from '@/entities/Notification';
import { ScrollUp } from '@/features/ScrollUp';
import { locales } from '@/shared/config/i18n/config';
import { SpaceCanvas } from '@/shared/ui/SpaceCanvas';
import { Footer } from '@/widgets/Footer';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

type LocaleLayoutProps = {
	children: ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params: { locale },
}: Omit<LocaleLayoutProps, 'children'>) {
	const t = await getTranslations({ locale });

	const metadata: Metadata = {
		title: t('RootLayout.title'),
		description: t('RootLayout.description'),
	};

	return metadata;
}

export default function LocaleLayout({
	children,
	params: { locale },
}: LocaleLayoutProps) {
	unstable_setRequestLocale(locale);

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<ServerProviders>
					<ClientProviders>
						<Suspense fallback={<PageLoader />}>
							<Navbar />
							{/* <Light /> */}
							{children}
							<Notification
								message='Добавьте наш сайт в закладки, чтобы не потерять'
								icon='/images/icons/bookmark-fill.svg'
							/>
							<SpaceCanvas />
							<ScrollUp />
							<Footer />
						</Suspense>
					</ClientProviders>
				</ServerProviders>
			</body>
		</html>
	);
}

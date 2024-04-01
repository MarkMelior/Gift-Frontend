import { ClientProviders } from '@/app/providers/ClientProviders';
import { ServerProviders } from '@/app/providers/ServerProviders';
import '@/app/styles/index.scss';
import { Notification } from '@/entities/Notification';
import { ScrollUp } from '@/features/ScrollUp';
import { BookmarkIcon } from '@/shared/assets/icon/Bookmark';
import { SpaceCanvas } from '@/shared/ui/SpaceCanvas';
import { Footer } from '@/widgets/Footer';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Melior Gift - Креативные подарки',
	description: 'Описание зверское сайта',
};

interface LocaleLayoutProps {
	children: ReactNode;
}

export default function LocaleLayout({ children }: LocaleLayoutProps) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<Suspense fallback={<PageLoader />}>
					<ServerProviders>
						<ClientProviders>
							<Navbar />
							{/* <Light /> */}
							{children}
							<Notification
								message='Добавьте наш сайт в закладки, чтобы не потерять'
								startContent={<BookmarkIcon opacity={0.5} />}
							/>
							<SpaceCanvas />
							<ScrollUp />
							<Footer />
						</ClientProviders>
					</ServerProviders>
				</Suspense>
			</body>
		</html>
	);
}

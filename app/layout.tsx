import { Providers } from '@/app/providers/ui/providers';
import '@/app/styles/index.scss';
import { Notification } from '@/entities/notification';
import { ScrollUp } from '@/features/scroll-up';
import { BookmarkIcon } from '@/shared/assets/icon/Bookmark';
import { SpaceCanvas } from '@/shared/ui/space-canvas';
import { Footer } from '@/widgets/footer';
import { Navbar } from '@/widgets/navbar';
import { PageLoader } from '@/widgets/page-loader';
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
					<Providers>
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
					</Providers>
				</Suspense>
			</body>
		</html>
	);
}

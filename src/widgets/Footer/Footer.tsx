import { GmailIcon } from '@/shared/assets/icon/Gmail';
import { TelegramIcon } from '@/shared/assets/icon/Telegram';
import { Logo } from '@/shared/ui/Logo';
import { Wave } from '@/shared/ui/Wave';
import cn from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import cls from './Footer.module.scss';
import { Links } from './data';

export const Footer: FC = () => {
	return (
		<>
			<Wave />
			<footer className={cls.footer}>
				<nav className={cn(cls.wrapper, 'content')}>
					<Link href='/' className={cn(cls.logo)}>
						<Logo opacity={0.3} width='3rem' height='3rem' />
					</Link>
					<p>© 2024 Brand Melior. Все права защищены</p>
					<div className={cls.linksContent}>
						<Link target='blank' href={Links.telegram.link}>
							<TelegramIcon width='1.5rem' height='1.5rem' />
						</Link>
						<span className={cls.spaces} />
						<Link target='blank' href={Links.gmail.link}>
							<GmailIcon width='1.5rem' height='1.5rem' />
						</Link>
					</div>
				</nav>
			</footer>
		</>
	);
};

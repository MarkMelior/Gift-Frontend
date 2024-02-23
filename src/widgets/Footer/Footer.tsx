import { Links } from '@/shared/const/links';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Logo } from '@/shared/ui/Logo';
import { Wave } from '@/shared/ui/Wave';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import cls from './Footer.module.scss';

interface FooterProps {
	className?: string;
}

export const Footer: FC<FooterProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<>
			<Wave />
			<div className={cl(cls.Footer, {}, [className])}>
				<div className={cl(cls.Content, {}, ['content'])}>
					<Link href='/' className={cl(cls.Logo, {}, [])}>
						<Logo opacity={0.3} />
					</Link>
					<p>{t('Footer.copyright')}</p>
					<div className={cls.LinksContent}>
						<Link target='blank' href={Links.telegram.link}>
							<Image
								src={Links.telegram.image}
								alt='Иконка Telegram'
								width={24}
								height={24}
								className='noselect'
							/>
						</Link>
						<span className={cls.Spaces} />
						<Link target='blank' href={Links.gmail.link}>
							<Image
								src={Links.gmail.image}
								alt='Иконка почты Gmail'
								width={24}
								height={24}
								className='noselect'
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

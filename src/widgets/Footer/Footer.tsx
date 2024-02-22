import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Logo } from '@/shared/ui/Logo';
import { Wave } from '@/shared/ui/Wave';
import { useTranslations } from 'next-intl';
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
				</div>
			</div>
		</>
	);
};

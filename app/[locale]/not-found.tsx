import { Link } from '@/shared/config/i18n/navigation';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import cls from './not-found.module.scss';

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');

	return (
		<div className={cl(cls.Content, {}, [])}>
			<div className={cl(cls.Information, {}, [])}>
				<h1>{t('title')}</h1>
				<p>{t('description')}</p>
			</div>
			<Link href='/'>
				<Button padding='padding-large' variant='layer'>
					{t('Вернуться на главную')}
				</Button>
			</Link>
			{/* <Wave style={{ position: 'absolute', bottom: 0 }} /> */}
		</div>
	);
}

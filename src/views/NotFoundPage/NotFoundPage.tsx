import { Link } from '@/shared/config/i18n/navigation';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
	const t = useTranslations('NotFoundPage');

	return (
		<div className={cls.wrapper}>
			<div className={cls.information}>
				<h1>{t('title')}</h1>
				<p>{t('description')}</p>
			</div>
			<Link href='/'>
				<Button
					starlight
					className='py-5 px-12 rounded-xl'
					customVariant='layer'
					startContent={
						<Image
							src='/images/icons/logo-melior-white.svg'
							width={24}
							height={24}
							alt={t('button-image')}
						/>
					}
				>
					{t('back')}
				</Button>
			</Link>
			{/* <Wave style={{ position: 'absolute', bottom: 0 }} /> */}
		</div>
	);
};

export default NotFoundPage;

import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FC } from 'react';

interface ShopPageProps {
	params: { locale: string };
}

const ShopPage: FC<ShopPageProps> = ({ params: { locale } }) => {
	unstable_setRequestLocale(locale);
	const t = useTranslations('ShopPage');

	return <div>{t('title')}</div>;
};

export default ShopPage;

import { Card } from '@/widgets/Card';
import { Heading } from '@/widgets/Heading';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './BestProduct.module.scss';

interface BestProductProps {
	className?: string;
}

export const BestProduct: FC<BestProductProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<div className={cn(cls.BestProduct, className, 'content')}>
			<Image
				src='/images/pages/glow-best.png'
				width={1624}
				height={862}
				alt='Background glow image'
				className={`${cls.Image} noselect`}
			/>
			<Heading
				title={t('Лучшие подарки')}
				description={t(
					'Это забота и внимание, которые приносят радость и оставляют незабываемые впечатления',
				)}
				note={t('Топ из топов')}
				doubleTitle={false}
				center
				customSize={3}
			></Heading>
			<div className={cls.Slider}>
				<Card
					hot
					oldPrice={58600}
					price={29245}
					title={'Xiaomi Mi Power Bank 3 20000 mAh'}
					defaultMarket={'ozon'}
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
				<Card
					hot
					oldPrice={58600}
					price={29245}
					title={'Xiaomi Mi Power Bank 3 20000 mAh'}
					defaultMarket={'ozon'}
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
				<Card
					hot
					oldPrice={58600}
					price={29245}
					title={'Xiaomi Mi Power Bank 3 20000 mAh'}
					defaultMarket={'ozon'}
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
				<Card
					hot
					oldPrice={58600}
					price={29245}
					title={'Xiaomi Mi Power Bank 3 20000 mAh'}
					defaultMarket={'ozon'}
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
				<Card
					hot
					oldPrice={58600}
					price={29245}
					title={'Xiaomi Mi Power Bank 3 20000 mAh'}
					defaultMarket={'ozon'}
					images={['/images/temp/cat.png']}
					rating={4.5}
					reviewCount={10}
				/>
			</div>
		</div>
	);
};

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
	const t = useTranslations('BestProduct');

	return (
		<section className={cn(className, 'content')}>
			<Image
				src='/images/pages/glow-best.png'
				width={1624}
				height={862}
				alt={t('background-glow-image-alt')}
				className={`${cls.image} noselect`}
			/>
			<Heading
				title={t('title')}
				description={t('description')}
				note={t('note')}
				doubleTitle={false}
				center
				customSize={3}
			></Heading>
			<div className={cls.slider}>
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
		</section>
	);
};

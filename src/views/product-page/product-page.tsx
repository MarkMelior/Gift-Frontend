'use client';

import {
	Cards,
	useGetProductQuery,
	useGetProductsQuery,
} from '@/entities/products';
import { Light } from '@/shared/ui/light';
import { Characteristics } from '@/widgets/characteristics';
import { ImageCarousel } from '@/widgets/image-carousel';
import { LinksPanel } from '@/widgets/links-panel';
import { PageLoader } from '@/widgets/page-loader';
import { Tooltip } from '@nextui-org/react';
import cn from 'clsx';
import { FC, memo } from 'react';
import { ProductPageProps } from '../../../app/product/[article]/page';
import cls from './product-page.module.scss';

export const ProductPage: FC<ProductPageProps> = memo(({ params }) => {
	const productArticle = params.article.split('-').reverse()[0];

	const { data: product } = useGetProductQuery(productArticle);
	const { data: products, isLoading } = useGetProductsQuery({ limit: '10' });

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<Light />
			<section className={cls.product}>
				<div className={cls.heading}>
					<Tooltip
						offset={5}
						placement='top'
						showArrow
						content={
							<div className='flex items-center gap-2'>
								{/* <Image
									src={`/images/icons/market/${
										Markets[product.markets[0].market].image
									}`}
									width={24}
									height={24}
									alt='test'
								/> */}
								<span>
									Информация получена с{' '}
									{/* {Markets[product.markets[0].market].name} */}
								</span>
							</div>
						}
						className={cls.tooltip}
					>
						{/* <Image
							src={`/images/icons/market/${
								Markets[product.markets[0].market].image
							}`}
							width={16}
							height={16}
							alt='test'
						/> */}
					</Tooltip>
					<h1>{product?.title}</h1>
				</div>
				{!product ? (
					<PageLoader classNames='!h-12' />
				) : (
					<div className={cls.productWrapper}>
						<ImageCarousel product={product} />
						<div className={cls.linksAndCharacteristics}>
							<Characteristics product={product} />
							<LinksPanel product={product} />
						</div>
					</div>
				)}
			</section>
			<section className={cls.cards}>
				<h3>Смотрите также</h3>
				<Cards data={products} isLoading={isLoading} />
			</section>
		</div>
	);
});

'use client';

import {
	Cards,
	useGetProductQuery,
	useGetProductsQuery,
} from '@/entities/products';
import { Markets } from '@/shared/const';
import { ConvertData } from '@/shared/lib/features';
import { Light } from '@/shared/ui/light';
import { ImageCarousel } from '@/widgets/image-carousel';
import { LinksPanel } from '@/widgets/links-panel';
import { PageLoader } from '@/widgets/page-loader';
import { ProductOptions } from '@/widgets/product-options';
import { Tooltip } from '@nextui-org/react';
import cn from 'clsx';
import Image from 'next/image';
import { FC, memo } from 'react';
import { ProductPageProps } from '../../../app/product/[article]/page';
import cls from './product-page.module.scss';

export const ProductPage: FC<ProductPageProps> = memo(({ params }) => {
	const productArticle = params.article.split('-').reverse()[0];

	const { data: product } = useGetProductQuery(productArticle);
	const { data: products, isLoading } = useGetProductsQuery({ limit: 10 });

	if (!product) return <PageLoader />;

	const formattedDate = ConvertData(product.updatedAt);

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<Light />
			<section className={cls.product}>
				<div className={cls.heading}>
					<Tooltip
						offset={5}
						placement='top'
						showArrow
						closeDelay={0}
						content={
							<div className='flex items-center gap-2'>
								<Image
									src={`/images/icons/market/${
										Markets[product.markets[0].market].image
									}`}
									width={24}
									height={24}
									alt='test'
								/>
								<span>
									Статистика с {Markets[product.markets[0].market].name}{' '}
									обновлена {formattedDate}
								</span>
							</div>
						}
						className={cls.tooltip}
					>
						<Image
							src={`/images/icons/market/${
								Markets[product.markets[0].market].image
							}`}
							width={18}
							height={18}
							alt='test'
							className='absolute mt-2 ml-1'
						/>
					</Tooltip>
					<h1 className='indent-8'>{product?.title}</h1>
				</div>
				<div className={cls.productWrapper}>
					<ImageCarousel product={product} />
					<div className={cls.linksAndOptions}>
						<ProductOptions product={product} />
						<LinksPanel product={product} />
					</div>
				</div>
			</section>
			<section className={cls.cards}>
				<h3>Смотрите также</h3>
				<Cards data={products} isLoading={isLoading} />
			</section>
		</div>
	);
});

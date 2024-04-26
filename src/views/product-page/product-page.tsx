'use client';

import {
	Cards,
	fetchProductById,
	fetchProductData,
	getProduct,
	getProductData,
	getProductIsLoading,
	productReducer,
} from '@/entities/products';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Light } from '@/shared/ui/light';
import { Characteristics } from '@/widgets/characteristics';
import { ImageCarousel } from '@/widgets/image-carousel';
import { LinksPanel } from '@/widgets/links-panel';
import { PageLoader } from '@/widgets/page-loader';
import { Tooltip } from '@nextui-org/react';
import cn from 'clsx';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProductPageProps } from '../../../app/product/[id]/page';
import cls from './product-page.module.scss';

const reducers: ReducersList = {
	product: productReducer,
};

export const ProductPage: FC<ProductPageProps> = memo(({ params }) => {
	const productId = params.id.split('-').reverse()[0];

	const dispatch = useAppDispatch();
	const product = useSelector(getProduct);
	const products = useSelector(getProductData);
	const isLoading = useSelector(getProductIsLoading);

	useEffect(() => {
		dispatch(fetchProductById(productId));
		dispatch(fetchProductData({ limit: 10 }));
	}, [dispatch, productId]);

	return (
		<DynamicModuleLoader reducers={reducers}>
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
		</DynamicModuleLoader>
	);
});

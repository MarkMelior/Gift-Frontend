import { productData } from '@/db';
import { Markets } from '@/shared/const';
import { ProductDataProps } from '@/shared/types/product';
import { Tooltip } from '@nextui-org/react';
import { ProductPageProps } from 'app/product/[id]/page';
import cn from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import cls from './ProductPage.module.scss';

export const ProductPage: FC<ProductPageProps> = ({ params }) => {
	const productId = Number(params.id.split('-').reverse()[0]);

	const product: ProductDataProps | undefined = productData.find(
		(product) => product.id === productId,
	);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<section className={cls.content}>
				<div className={cls.product}>
					<div className={cls.heading}>
						<Tooltip
							offset={5}
							placement='top'
							showArrow
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
										Статистика с {Markets[product.markets[0].market].name}
									</span>
								</div>
							}
							className={cls.tooltip}
						>
							<Image
								src={`/images/icons/market/${Markets[product.markets[0].market].image}`}
								width={16}
								height={16}
								alt='test'
							/>
						</Tooltip>
						<h1>{product.title}</h1>
					</div>
				</div>
				<div className={cls.links}></div>
			</section>
		</div>
	);
};

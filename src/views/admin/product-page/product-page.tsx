import { Blackhole } from '@/shared/ui/blackhole';
import { ProductsTable } from '@/widgets/products-table';
import { TopPage } from '@/widgets/top-page';
import cn from 'clsx';
import { FC } from 'react';
import cls from './product-page.module.scss';

export const AdminProductPage: FC = () => {
	return (
		<div className={cn(cls.wrapper, 'content')}>
			<Blackhole flip className='!mb-[-200px]' />
			<TopPage
				compact
				note='Админ-панель'
				title='Продукты'
				description='Управление продуктами'
				// imageContent={
				// 	<Image
				// 		src='/images/pages/heart.png'
				// 		alt='image'
				// 		width={1080}
				// 		height={1080}
				// 		className='noselect'
				// 	/>
				// }
			/>
			<ProductsTable />
		</div>
	);
};

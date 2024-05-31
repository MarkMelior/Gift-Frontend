import { Blackhole } from '@/shared/ui/blackhole';
import { NavigationPanel } from '@/widgets/navigation-panel';
import { TopPage } from '@/widgets/top-page';
import { FC } from 'react';
import { ShopBlock } from './shop-block';
import cls from './shop-page.module.scss';

export const ShopPage: FC = () => {
	return (
		<>
			<TopPage
				note='Найти подарок - легко'
				title='Melior Gift'
				description='Находить креативные подарки теперь легко и приятно.'
				compact
				imageContent={
					<img src='/images/pages/gift.png' alt='image' className='noselect' />
				}
			/>
			<div className={cls.navigation}>
				<Blackhole />
				<NavigationPanel />
			</div>
			<ShopBlock />
		</>
	);
};

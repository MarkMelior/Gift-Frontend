import { Blackhole } from '@/shared/ui/blackhole';
import { About } from '@/widgets/about';
import { Advantages } from '@/widgets/advantages';
import { BestProduct } from '@/widgets/best-product';
import { NavigationPanel } from '@/widgets/navigation-panel';
import { Ready } from '@/widgets/ready';
import { ReviewsCarousel } from '@/widgets/reviews-carousel';
import { TopPage } from '@/widgets/top-page';
import { FC, memo } from 'react';

const MainPage: FC = memo(() => {
	return (
		<>
			<TopPage
				note='Найти подарок - легко'
				title='Melior Gift'
				description='Находить креативные подарки теперь легко и приятно.'
				imageContent={
					<img src='/images/pages/gift.png' alt='image' className='noselect' />
				}
			/>
			<Blackhole disabledOnMobile />
			<NavigationPanel />
			<Advantages />
			<About />
			<BestProduct />
			<ReviewsCarousel />
			<Ready />
		</>
	);
});

export default MainPage;

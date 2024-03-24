import { Blackhole } from '@/shared/ui/Blackhole';
import { About } from '@/widgets/About';
import { Advantages } from '@/widgets/Advantages';
import { BestProduct } from '@/widgets/BestProduct';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { Ready } from '@/widgets/Ready';
import { ReviewsCarousel } from '@/widgets/ReviewsCarousel';
import { TopPage } from '@/widgets/TopPage';
import Image from 'next/image';
import { FC } from 'react';

const MainPage: FC = () => {
	return (
		<>
			<TopPage
				title='Easy Gift'
				description='Каждый подарок может быть искусством'
				note='Лучший выбор в мире'
				imageContent={
					<Image
						src='/images/pages/gift.png'
						alt='image'
						width={371}
						height={419}
						className='noselect'
					/>
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
};

export default MainPage;

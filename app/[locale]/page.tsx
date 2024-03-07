import { About } from '@/pages/About';
import { Advantages } from '@/pages/Advantages';
import { BestProduct } from '@/pages/BestProduct';
import { TopPage } from '@/pages/TopPage';
import { Card } from '@/widgets/Card';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
	const t = useTranslations();

	return (
		<>
			<TopPage
				title='Easy Gift'
				description={t('Каждый подарок может быть искусством')}
				note={t('Лучший выбор в мире')}
				// compact
			/>
			<NavigationPanel />
			{/* <Popover placement='right' showArrow offset={10}>
				<PopoverTrigger>
					<Button>Open Popover</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className='px-1 py-2'>
						<div className='text-small font-bold'>Popover Content</div>
						<div className='text-tiny'>This is the popover content</div>
					</div>
				</PopoverContent>
			</Popover> */}
			<Advantages />
			<About />
			<BestProduct />
			<Card price={0} title={''} defaultMarket={'ozon'} images={[]} />
		</>
	);
};

export default HomePage;

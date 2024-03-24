import { productData } from '@/db';
import { Blackhole } from '@/shared/ui/Blackhole';
import { Button } from '@/shared/ui/Button';
import { Cards } from '@/shared/ui/Card';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { Sorts } from '@/widgets/Sorts';
import { TopPage } from '@/widgets/TopPage';
import { Image, Textarea } from '@nextui-org/react';
import cn from 'clsx';
import { FC } from 'react';
import cls from './ShopPage.module.scss';

export const ShopPage: FC = () => {
	return (
		<>
			<TopPage
				compact
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
			<div className={cls.navigation}>
				<Blackhole />
				<NavigationPanel />
			</div>
			<div className={cn(cls.wrapper, 'content')}>
				<Sorts />
				<div className={cls.block}>
					<div className={cls.ai}>
						<Textarea
							maxRows={2}
							maxLength={250}
							className={cls.textarea}
							id='textarea'
							aria-label='Текстовое поле ввода для поиска подарка нейросетью'
							placeholder='Введите текстовый запрос и нейросеть поможет вам подобрать подарок'
						/>
						<Button
							aria-labelledby='textarea'
							customVariant='layer'
							hoverColor='149, 66, 255'
							starlight
							className='py-3 px-8 rounded-lg text-sm'
							startContent={
								<Image
									src='/images/icons/stars-heading-colored.svg'
									alt='test'
									width={22}
									height={22}
									style={{ minWidth: '22px', height: '22px' }}
									className='noselect'
								/>
							}
						>
							Найти подарок
						</Button>
					</div>
					<Cards data={productData} />
				</div>
			</div>
		</>
	);
};

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { NavigationPanel } from '@/widgets/NavigationPanel';
import { TopPage } from '@/widgets/TopPage';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import { FC } from 'react';
import cls from './ShopPage.module.scss';

export const ShopPage: FC = () => {
	// const t = useTranslations('ShopPage');

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
			<NavigationPanel className={cls.navigationPanel} />
			<div className={cn(cls.wrapper, 'content')}>
				<div className={cls.sort}>
					<div>
						<h6>Бюджет</h6>
					</div>
					<div>
						<h6>Кому?</h6>
					</div>
					<div>
						<h6>Возраст</h6>
					</div>
					<div>
						<h6>Сортировка</h6>
					</div>
				</div>
				<div className={cls.block}>
					<div className={cls.ai}>
						<Input
							className={cls.aiInput}
							placeholder='Введите текстовый запрос и нейросеть поможет вам подобрать подарок'
						/>
						<Button
							customVariant='layer'
							starlight
							className='py-5 px-12 rounded-lg'
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
					<div className={cls.cards}></div>
				</div>
			</div>
		</>
	);
};

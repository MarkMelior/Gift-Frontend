import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import cls from './not-found-page.module.scss';

const NotFoundPage: FC = () => {
	return (
		<>
			{/* <Blackhole flip className='!mb-[-200px]' /> */}
			<div className={cls.wrapper}>
				<div className={cls.information}>
					<h1>Ошибка 404</h1>
					<p>Страница не существует</p>
				</div>
				<Button
					as={Link}
					href='/'
					starlight
					className='py-5 px-12 rounded-xl'
					customVariant='layer'
					startContent={
						<Image
							src='/images/icons/logo-melior-white.svg'
							width={24}
							height={24}
							alt='Логотип'
						/>
					}
				>
					Вернуться на главную
				</Button>
			</div>
		</>
	);
};

export default NotFoundPage;

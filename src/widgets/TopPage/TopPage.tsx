import { classNames as cl } from '@/shared/lib/classNames';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/shared/ui/Heading';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, memo } from 'react';
import cls from './TopPage.module.scss';

interface TopPageProps {
	title: string;
	description: string;
	note?: string;
	compact?: boolean;
}

export const TopPage: FC<TopPageProps> = memo(
	({ title, description, note, compact }) => {
		const t = useTranslations();

		return (
			<section className={cl(cls.Content, {}, ['content'])}>
				<div className={cls.BackgroundTop}>
					<div className={cls.Background}>
						<div />
					</div>
				</div>
				<div className={cls.Main}>
					<div className={cls.Information}>
						<Heading title={title} description={description} note={note} />
						{!compact && (
							<Button padding='padding-large' variant='layer'>
								<Image
									src='/images/icons/gift.svg'
									width={24}
									height={24}
									alt='Иконка подарка'
									className='noselect'
								/>
								{t('Найти подарок')}
							</Button>
						)}
					</div>
					<div className={cls.Image}>
						<Image
							src='/images/pages/gift.png'
							alt='gift'
							width={371}
							height={419}
							className='noselect'
						/>
					</div>
				</div>
			</section>
		);
	},
);

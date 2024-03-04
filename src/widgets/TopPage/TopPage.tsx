/* eslint-disable i18next/no-literal-string */
'use client';

import { classNames as cl } from '@/shared/lib/classNames';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/widgets/Heading';
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
		// const splineRef = useRef(null);

		// Shadow DOM
		// useEffect(() => {
		// 	const shadowRoot = splineRef.current.shadowRoot;

		// 	const style = document.createElement('style');
		// 	style.textContent =
		// 		'canvas { width: 600px !important; height: 600px !important; } a { display: none !important; }';

		// 	shadowRoot.appendChild(style);
		// }, []);

		return (
			<section className={cl(cls.Content, {}, ['content'])}>
				<div className={cls.BackgroundTop}>
					<div className={cls.Background}>
						<div />
					</div>
				</div>
				<div className={cls.Main}>
					{/* <div>
						<Button variant='layer'>Привет</Button>
						<Button clear>Привет</Button>
						<Button padding='lg' variant='default'>
							Привет
						</Button>
						<Button padding='md' variant='flat'>
							Привет
						</Button>
						<Button padding='md' variant='glowing' slice>
							Привет
						</Button>
					</div> */}
					<div className={cls.Information}>
						<Heading title={title} description={description} note={note} />
						{!compact && (
							<>
								<div className={`${cls.Dots} noselect`} />
								<Button padding='lg' variant='layer'>
									<Image
										src='/images/icons/gift.svg'
										width={24}
										height={24}
										alt='Иконка подарка'
										className='noselect'
									/>
									{t('Найти подарок')}
								</Button>
							</>
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
						{/* <script
							type='module'
							src='https://unpkg.com/@splinetool/viewer@1.0.55/build/spline-viewer.js'
							width='100%'
							height='700px'
						/>
						<spline-viewer
							url='https://prod.spline.design/mxF2EyMzspLO0Kxj/scene.splinecode'
							ref={splineRef}
						/> */}
					</div>
				</div>
			</section>
		);
	},
);

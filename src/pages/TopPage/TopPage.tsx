/* eslint-disable i18next/no-literal-string */
'use client';

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
		const t = useTranslations('TopPage');
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
			<section className='content'>
				<div className={cls.backgroundTop}>
					<div className={cls.background}>
						<div />
					</div>
				</div>
				<div className={cls.main}>
					<div className={cls.information}>
						<Heading title={title} description={description} note={note} />
						{!compact && (
							<>
								<div className={`${cls.dots} noselect`} />
								<Button
									starlight
									className='py-5 px-12 rounded-xl'
									variant='layer'
									startContent={
										<Image
											src='/images/icons/gift.svg'
											width={24}
											height={24}
											alt='Иконка подарка'
											className='noselect'
										/>
									}
								>
									{t('button')}
								</Button>
							</>
						)}
					</div>
					<div className={cls.image}>
						<Image
							src='/images/pages/gift.png'
							alt={t('image')}
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

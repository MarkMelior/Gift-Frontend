'use client';

/* eslint-disable i18next/no-literal-string */
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Link } from '@/shared/config/i18n/navigation';
import { MediaSize } from '@/shared/config/mediaQuery/sizes';
import { Button } from '@/shared/ui/Button';
import { Heading } from '@/widgets/Heading';
import cn from 'clsx';
import { useTranslations } from 'next-intl';
import { FC, ReactNode, memo, useMemo } from 'react';
import MediaQuery from 'react-responsive';
import cls from './TopPage.module.scss';

interface TopPageProps {
	title: string;
	description: string;
	note?: string;
	compact?: boolean;
	imageContent?: ReactNode;
}

export const TopPage: FC<TopPageProps> = memo(
	({ title, description, note, compact, imageContent }) => {
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

		const renderHeading = useMemo(() => {
			return <Heading title={title} description={description} note={note} />;
		}, [description, note, title]);

		return (
			<section className='content'>
				{!compact && (
					<MediaQuery minWidth={MediaSize.SM}>
						<div className={cls.backgroundTop}>
							<div className={cls.background}>
								<div />
							</div>
						</div>
					</MediaQuery>
				)}
				<div className={cn(cls.wrapper, { [cls.compact]: compact })}>
					{!compact ? (
						<div className={cls.information}>
							{renderHeading}
							<div className={`${cls.dots} noselect`} />
							<Link href='/shop'>
								<Button
									starlight
									className='py-5 px-12 rounded-xl'
									customVariant='layer'
									startContent={<GiftIcon width='1.5rem' height='1.5rem' />}
								>
									{t('button')}
								</Button>
							</Link>
						</div>
					) : (
						renderHeading
					)}
					<MediaQuery minWidth={MediaSize.MD}>
						<div className={cn(cls.image, { [cls.compact]: compact })}>
							{imageContent}
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
					</MediaQuery>
				</div>
			</section>
		);
	},
);

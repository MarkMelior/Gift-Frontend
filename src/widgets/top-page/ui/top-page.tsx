'use client';

import { getSettingsOptimization } from '@/features/settings';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { MediaSize } from '@/shared/const';
import { Button } from '@/shared/ui/button';
import { Heading } from '@/widgets/heading';
import cn from 'clsx';
import Link from 'next/link';
import { FC, ReactNode, memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import cls from './top-page.module.scss';

interface TopPageProps {
	className?: string;
	title: string;
	description: string;
	note?: string;
	compact?: boolean;
	imageContent?: ReactNode;
	onClickNote?: () => void;
}

export const TopPage: FC<TopPageProps> = memo(
	({
		title,
		className,
		description,
		note,
		compact,
		imageContent,
		onClickNote,
	}) => {
		// * spline remove logo
		// const splineRef = useRef(null);
		// Shadow DOM
		// useEffect(() => {
		// 	const shadowRoot = splineRef.current.shadowRoot;
		// 	const style = document.createElement('style');
		// 	style.textContent =
		// 		'canvas { width: 600px !important; height: 600px !important; } a { display: none !important; }';
		// 	shadowRoot.appendChild(style);
		// }, []);

		const isOptimization = useSelector(getSettingsOptimization);

		const renderHeading = useMemo(() => {
			return (
				<Heading
					title={title}
					description={description}
					note={note}
					onClickNote={onClickNote}
				/>
			);
		}, [description, note, onClickNote, title]);

		const [isMounted, setMounted] = useState(false);

		useEffect(() => {
			setMounted(true);
		}, []);

		if (!isMounted) return;

		return (
			<section
				className={cn(cls.wrapper, className, 'content', {
					[cls.compact]: compact,
				})}
			>
				{!compact && (
					<MediaQuery minWidth={MediaSize.SM}>
						<div
							className={cls.backgroundTop}
							data-optimization={isOptimization}
						>
							<div className={cls.background}>
								<div />
							</div>
						</div>
					</MediaQuery>
				)}
				{!compact ? (
					<div className={cls.information}>
						{renderHeading}
						<div className={`${cls.dots} noselect`} />
						<Button
							as={Link}
							href='/shop'
							starlight
							className='py-5 px-12 rounded-xl'
							customVariant='layer'
							startContent={<GiftIcon width='1.5rem' height='1.5rem' />}
						>
							Найти подарок
						</Button>
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
			</section>
		);
	},
);

'use client';

import { getSettingsSpace } from '@/features/settings';
import { MediaSize } from '@/shared/const';
import { Theme } from '@/shared/types/theme';
import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import cn from 'clsx';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from 'next-themes';
import { Suspense, memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import cls from './space-canvas.module.scss';

const StarBackground = memo((props: any) => {
	const ref: any = useRef();
	const [sphere] = useState(() =>
		random.inSphere(new Float32Array(5001), { radius: 1.2 }),
	);

	useFrame((_, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
		// eslint-disable-next-line
		<group rotation={[0, 0, 0]}>
			<Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
				<PointMaterial
					transparent
					size={0.002}
					sizeAttenuation
					depthWrite={false}
				/>
			</Points>
		</group>
	);
});

export const SpaceCanvas = memo(() => {
	const [isVisible, setIsVisible] = useState(true);
	const { theme } = useTheme();
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });
	const isSpace = useSelector(getSettingsSpace);

	useEffect(() => {
		const handleResize = () => {
			const isSmallScreen = window.innerWidth < 768;
			setIsVisible(!isSmallScreen);
		};

		handleResize(); // Вызываем при монтировании, чтобы установить начальное состояние

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isVisible || theme === Theme.LIGHT || isMD || !isSpace || !isMounted)
		return null;

	return (
		<div className={cn(cls.wrapper, 'noselect')}>
			<Canvas camera={{ position: [0, 0, 1] }}>
				<Suspense fallback={null}>
					<StarBackground />
				</Suspense>
			</Canvas>
		</div>
	);
});

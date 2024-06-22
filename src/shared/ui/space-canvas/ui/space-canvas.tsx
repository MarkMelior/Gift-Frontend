'use client';

import { useSettings } from '@/shared/config/settings';
import { MediaSize } from '@/shared/const';
import { Theme } from '@/shared/types/theme';
import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import cn from 'clsx';
import { random } from 'maath';
import { useTheme } from 'next-themes';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './space-canvas.module.scss';

const StarBackground = (props: any) => {
	const ref: any = useRef();
	const [sphere] = useState(() =>
		random.inSphere(new Float32Array(5001), { radius: 1.2 }),
	);

	useFrame((_, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
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
};

export const SpaceCanvas = () => {
	const [isVisible, setIsVisible] = useState(true);
	const { theme } = useTheme();
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });
	const { space } = useSettings();

	useEffect(() => {
		const handleResize = () => {
			const isSmallScreen = window.innerWidth < 768;
			setIsVisible(!isSmallScreen);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isVisible || theme === Theme.LIGHT || isMD || !space || !isMounted)
		return <></>;

	return (
		<div className={cn(cls.wrapper, 'noselect')}>
			<Canvas camera={{ position: [0, 0, 1] }}>
				<Suspense fallback={null}>
					<StarBackground />
				</Suspense>
			</Canvas>
		</div>
	);
};

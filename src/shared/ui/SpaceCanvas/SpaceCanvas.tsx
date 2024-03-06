'use client';

import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import cls from './SpaceCanvas.module.scss';

const StarBackground = (props: any) => {
	const ref: any = useRef();
	const [sphere] = useState(
		() =>
			// eslint-disable-next-line implicit-arrow-linebreak
			random.inSphere(new Float32Array(5000), { radius: 1.2 }),
		// eslint-disable-next-line function-paren-newline
	);

	useFrame((_, delta) => {
		ref.current.rotation.x -= delta / 10;
		ref.current.rotation.y -= delta / 15;
	});

	return (
		// eslint-disable-next-line react/no-unknown-property
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

	if (!isVisible || theme === Theme.LIGHT) {
		return null;
	}

	return (
		<div className={cl(cls.Content, {}, ['noselect'])}>
			<Canvas camera={{ position: [0, 0, 1] }}>
				<Suspense fallback={null}>
					<StarBackground />
				</Suspense>
			</Canvas>
		</div>
	);
};

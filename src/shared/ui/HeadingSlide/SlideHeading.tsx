'use client';

import cn from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import cls from './SlideHeading.module.scss';

interface SlideHeadingProps {
	text: string;
}

export const SlideHeading = ({ text }: SlideHeadingProps) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['0 2', '1 0'],
	});

	text = text.toUpperCase();

	return (
		<div className={cls.wrapper}>
			<div ref={ref} className={cn(cls.header, 'content')}>
				<motion.h1
					className={cls.left}
					style={{
						translateX: useTransform(scrollYProgress, [0, 1], [0, 1000]),
					}}
				>
					{text}
				</motion.h1>
				<motion.h1
					className={cls.right}
					style={{
						translateX: useTransform(scrollYProgress, [0, 1], [0, -1000]),
					}}
				>
					{text}
				</motion.h1>
			</div>
		</div>
	);
};

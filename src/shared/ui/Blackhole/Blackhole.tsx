import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { FC } from 'react';
import cls from './Blackhole.module.scss';

interface BlackholeProps {
	className?: string;
}

export const Blackhole: FC<BlackholeProps> = ({ className = '' }) => {
	return (
		<div className={cl(cls.Blackhole, {}, [className])}>
			<div className={cls.Circles}>
				<div />
				<div />
				<div />
			</div>
			{/* <video
				autoPlay
				loop
				muted
				playsInline
				className={`${cls.Video} noselect`}
			>
				<source src='/videos/blackhole.webm' />
			</video> */}
		</div>
	);
};

import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { FC } from 'react';
import cls from './Blackhole.module.scss';

interface BlackholeProps {
	className?: string;
	flip?: boolean;
}

export const Blackhole: FC<BlackholeProps> = ({ className = '', flip }) => {
	return (
		<div
			className={cl(cls.Blackhole, { [cls.flip]: flip }, [
				className,
				'noselect',
			])}
		>
			<div className={cls.Circles}>
				<div />
				<div />
				<div />
			</div>
			<video
				autoPlay
				loop
				muted
				playsInline
				className={`${cls.Video} noselect`}
			>
				<source src='/videos/blackhole.webm' />
			</video>
		</div>
	);
};

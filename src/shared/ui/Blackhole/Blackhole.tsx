import cn from 'clsx';
import { FC } from 'react';
import cls from './Blackhole.module.scss';

interface BlackholeProps {
	className?: string;
	flip?: boolean;
}

export const Blackhole: FC<BlackholeProps> = ({ className = '', flip }) => {
	return (
		<div
			className={cn(cls.blackhole, { [cls.flip]: flip }, className, 'noselect')}
		>
			<div className={cls.circles}>
				<div />
				<div />
				<div />
			</div>
			<video
				autoPlay
				loop
				muted
				playsInline
				className={`${cls.video} noselect`}
			>
				<source src='/videos/blackhole.webm' />
			</video>
		</div>
	);
};

import cn from 'clsx';
import { FC } from 'react';
import cls from './star-rating.module.scss';

interface StarRatingProps {
	rating: number;
	className?: string;
}

export const StarRating: FC<StarRatingProps> = ({ rating = 0, className }) => {
	return (
		<div className={cn(cls.wrapper, className)}>
			<span className={cls.fill} style={{ width: `calc(16px * ${rating})` }} />
			<span className={cls.empty} />
		</div>
	);
};

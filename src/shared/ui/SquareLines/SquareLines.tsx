import cn from 'clsx';
import { FC, ReactNode } from 'react';
import cls from './SquareLines.module.scss';

interface SquareLinesProps {
	className?: string;
	children?: ReactNode;
	lineCount?: number;
}

export const SquareLines: FC<SquareLinesProps> = ({
	className = '',
	children,
	lineCount = 3,
}) => {
	const squareItems = [];

	for (let i = 0; i < lineCount && i < 4; i += 1) {
		squareItems.push(
			<div key={i} className={cls.squareItem}>
				<div />
			</div>,
		);
	}

	return (
		<div className={cn(cls.square, className)}>
			{children}
			{squareItems}
		</div>
	);
};

import { Button } from '@/shared/ui/Button';
import cn from 'clsx';
import Image from 'next/image';
import { FC, memo } from 'react';
import cls from './Heading.module.scss';

interface HeadingProps {
	className?: string;
	title: string;
	doubleTitle?: boolean;
	description: string;
	note?: string;
	center?: boolean;
	customSize?: number;
}

export const Heading: FC<HeadingProps> = memo(
	({
		className = '',
		title,
		doubleTitle = true,
		description,
		note,
		center,
		customSize,
	}) => {
		return (
			<div className={cn(cls.Heading, { [cls.center]: center }, className)}>
				<Button
					variant='hero'
					className='text-sm py-0.5 px-2.5 rounded-full'
					startContent={
						<Image
							src='/images/icons/stars-heading-colored.svg'
							alt='Easy Gift Logo'
							width={16}
							height={16}
							className='noselect'
						/>
					}
				>
					{note}
				</Button>
				<div className={cls.Title}>
					<h1 style={{ fontSize: `${customSize}rem` }}>{title}</h1>
					{doubleTitle && <p className='noselect'>{title}</p>}
				</div>
				<p className={cls.Description}>{description}</p>
			</div>
		);
	},
);

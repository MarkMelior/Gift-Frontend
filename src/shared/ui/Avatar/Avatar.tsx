import { Mods, classNames as cl } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import cls from './Avatar.module.scss';

type AvatarRadius =
	| 'radius-full'
	| 'radius-large'
	| 'radius-medium'
	| 'radius-small'
	| 'radius-none';

type AvatarSize = 'tiny' | 'small' | 'medium' | 'large';

interface AvatarProps {
	src?: string;
	alt?: string;
	className?: string;
	disabled?: boolean;
	size?: AvatarSize;
	border?: boolean;
	radius?: AvatarRadius;
}

export const Avatar: FC<AvatarProps> = ({
	src,
	alt = 'Фото профиля пользователя',
	className = '',
	disabled,
	size = 40,
	border,
	radius = 'radius-full',
	...otherProps
}) => {
	const t = useTranslations();

	const mods: Mods = {
		[cls.disabled]: disabled,
		[cls.border]: border,
	};

	return (
		<Button clear className={cl(cls.Avatar, mods, [className, cls[size]])}>
			{src && (
				<Image
					className='noselect'
					src={src}
					alt={alt}
					width={128}
					height={128}
					{...otherProps}
				/>
			)}
		</Button>
	);
};

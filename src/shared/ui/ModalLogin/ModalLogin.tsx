import cn from 'clsx';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import cls from './ModalLogin.module.scss';

interface ModalLoginProps {
	className?: string;
}

export const ModalLogin: FC<ModalLoginProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<aside className={cn(cls.modalLogin, className)}>
			<div className={cls.content}>Login</div>
		</aside>
	);
};

import { classNames as cl } from '@/shared/lib/classNames';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import cls from './ModalLogin.module.scss';

interface ModalLoginProps {
	className?: string;
}

export const ModalLogin: FC<ModalLoginProps> = ({ className = '' }) => {
	const t = useTranslations();

	return (
		<aside className={cl(cls.ModalLogin, {}, [className])}>
			<div className={cl(cls.Content, {}, [])}>Login</div>
		</aside>
	);
};

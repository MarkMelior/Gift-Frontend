import { classNames as cl } from '@/shared/lib/classNames/classNames';
import { FC } from 'react';
import cls from './Loader.module.scss';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = () => {
	return (
		// <Portal element={document.body}>
		<span className={cl(cls.Loader, {}, [])} />
		// </Portal>
	);
};

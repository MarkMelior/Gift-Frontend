import { FC } from 'react';
import cls from './Loader.module.scss';

interface LoaderProps {}

export const Loader: FC<LoaderProps> = () => {
	return (
		// <Portal element={document.body}>
		<span className={cls.Loader} />
		// </Portal>
	);
};

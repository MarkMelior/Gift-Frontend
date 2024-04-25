'use client';

import { Spinner } from '@nextui-org/react';
import { createPortal } from 'react-dom';
import cls from './loader.module.scss';

export const Loader = () => {
	return createPortal(
		<Spinner size='sm' className={cls.loader} />,
		document.body,
	);
};

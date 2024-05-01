'use client';

import { getUserAuthData, initAuthData } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib/hooks';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface InitAppProps {
	children: ReactNode;
}

export const InitApp = ({ children }: InitAppProps) => {
	const dispatch = useAppDispatch();
	const isUserLogged = useSelector(getUserAuthData);

	useEffect(() => {
		dispatch(initAuthData());
	}, [dispatch, isUserLogged]);

	return <>{children}</>;
};

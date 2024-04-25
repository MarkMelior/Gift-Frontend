'use client';

import { fetchUserData, getUserAuthData } from '@/entities/user';
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
		if (isUserLogged) dispatch(fetchUserData());
	});

	return <>{children}</>;
};

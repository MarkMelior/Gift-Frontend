'use client';

import {
	fetchUserData,
	getUserData,
	getUserError,
	getUserIsLoading,
	userReducer,
} from '@/entities/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import cn from 'clsx';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePageProps } from '../../../app/profile/page';
import cls from './profile-page.module.scss';

const reducers: ReducersList = {
	user: userReducer,
};

export const ProfilePage: FC<ProfilePageProps> = memo(() => {
	const dispatch = useAppDispatch();
	const userData = useSelector(getUserData);
	const isLoading = useSelector(getUserIsLoading);
	const error = useSelector(getUserError);

	useEffect(() => {
		dispatch(fetchUserData());
	}, [dispatch]);

	if (isLoading) {
		return <div>Загрузка идёт!</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={cn(cls.wrapper, 'content')}>{userData?.username}</div>
		</DynamicModuleLoader>
	);
});

'use client';

import { getUserData, getUserError, getUserIsLoading } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks';
import { PageLoader } from '@/widgets/page-loader';
import cn from 'clsx';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePageProps } from '../../../app/profile/page';
import cls from './profile-page.module.scss';

export const ProfilePage: FC<ProfilePageProps> = memo(() => {
	const dispatch = useAppDispatch();
	const userData = useSelector(getUserData);
	const isLoading = useSelector(getUserIsLoading);
	const error = useSelector(getUserError);

	if (isLoading) {
		return <PageLoader />;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	if (!userData) return null;

	return <div className={cn(cls.wrapper, 'content')}>{userData.username}</div>;
});

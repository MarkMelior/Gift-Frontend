'use client';

import { getUserState } from '@/entities/user';
import { PageLoader } from '@/widgets/page-loader';
import cn from 'clsx';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePageProps } from '../../../app/profile/page';
import cls from './profile-page.module.scss';

export const ProfilePage: FC<ProfilePageProps> = memo(() => {
	const { data: userData, isLoading, error } = useSelector(getUserState);

	if (isLoading) {
		return <PageLoader />;
	}

	if (error) {
		console.log(error);
		return <div>Ошибка в console log!</div>;
	}

	if (!userData) return null;

	return <div className={cn(cls.wrapper, 'content')}>{userData.username}</div>;
});

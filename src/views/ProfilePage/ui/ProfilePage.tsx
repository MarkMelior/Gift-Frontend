'use client';

import { profileReducer } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { ProfilePageProps } from 'app/[profile]/page';
import cn from 'clsx';
import { notFound } from 'next/navigation';
import { FC, memo } from 'react';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

export const ProfilePage: FC<ProfilePageProps> = memo(({ params }) => {
	if (!params.profile.startsWith('%40')) notFound();

	const username = params.profile.split('%40');

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={cn(cls.wrapper, 'content')}>
				Профиль пользователя: {username}
			</div>
		</DynamicModuleLoader>
	);
});

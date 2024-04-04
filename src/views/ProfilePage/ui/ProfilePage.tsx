'use client';

import {
	fetchProfileData,
	getProfileData,
	getProfileError,
	getProfileIsLoading,
	profileReducer,
} from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/Input';
import { ProfilePageProps } from 'app/[profile]/page';
import cn from 'clsx';
import { notFound } from 'next/navigation';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

export const ProfilePage: FC<ProfilePageProps> = memo(({ params }) => {
	if (!params.profile.startsWith('%40')) notFound();
	const username = params.profile.split('%40');

	const dispatch = useAppDispatch();
	const data = useSelector(getProfileData);
	const error = useSelector(getProfileError);
	const isLoading = useSelector(getProfileIsLoading);

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	if (isLoading) {
		return <div>Загрузка идёт!</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={cn(cls.wrapper, 'content')}>
				Профиль пользователя: {data?.username}
				Возраст пользователя: {data?.age}
				Почта пользователя: {data?.email}
				<div>
					<Input value={data?.username} placeholder='Логин' />
					<Input value={data?.first} placeholder='Имя' />
					<Input value={data?.last} placeholder='Фамилия' />
				</div>
			</div>
		</DynamicModuleLoader>
	);
});

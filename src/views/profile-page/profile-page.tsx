'use client';

import { getUserAuthData, getUserState } from '@/entities/user';
import { ModalAuth, onUserLogout } from '@/features/auth';
import { ConvertData } from '@/shared/lib/features';
import { BackgroundColorSpin } from '@/shared/ui/animate-background';
import { Button as MyButton } from '@/shared/ui/button';
import { ErrorScreen } from '@/shared/ui/errors';
import { PageLoader } from '@/widgets/page-loader';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from '@nextui-org/react';
import cn from 'clsx';
import Image from 'next/image';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePageProps } from '../../../app/profile/page';
import cls from './profile-page.module.scss';

export const ProfilePage: FC<ProfilePageProps> = memo(() => {
	const { data: user, isLoading, error } = useSelector(getUserState);
	const isUserLogged = useSelector(getUserAuthData);
	const formattedDate = ConvertData(user?.createdAt);

	const {
		isOpen: isOpenAuthModal,
		onOpen: onOpenAuthModal,
		onOpenChange: onOpenChangeAuthModal,
	} = useDisclosure();

	if (!isUserLogged && !isLoading)
		return (
			<>
				<div className={cls.notAuth}>
					<ErrorScreen
						title='Войдите или зарегистрируйтесь'
						description='Вы не авторизованы'
						image={<img src='/images/error/lock.png' />}
					/>
					<MyButton
						starlight
						className='py-5 px-12 rounded-xl'
						customVariant='layer'
						onClick={onOpenAuthModal}
						startContent={
							<Image
								src='/images/icons/logo-melior-white.svg'
								width={24}
								height={24}
								alt='Логотип'
							/>
						}
					>
						Войти
					</MyButton>
				</div>
				<ModalAuth
					isOpen={isOpenAuthModal}
					onOpenChange={onOpenChangeAuthModal}
				/>
			</>
		);

	if (isLoading || !user) {
		return <PageLoader />;
	}

	if (error) {
		return <ErrorScreen />;
	}

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<BackgroundColorSpin className={cls.card}>
				<div className={cls.user}>
					<Image
						src={`${process.env.UPLOADS}/avatars/${user?.id}/${user?.avatar}`}
						alt='Аватар'
						width={96}
						height={96}
						className={cn(cls.avatar, 'noselect')}
					/>
					<span>
						<h6>{user.username}</h6>
						<p>{user.email}</p>
					</span>
				</div>
				{/* <div className='flex gap-2'>
					<Button variant='bordered' fullWidth>
						Изменить почту
					</Button>
					<Button variant='bordered' fullWidth>
						Изменить пароль
					</Button>
				</div> */}
				<Table
					hideHeader
					isStriped
					aria-label='Example static collection table'
				>
					<TableHeader>
						<TableColumn>Название</TableColumn>
						<TableColumn>Статистика</TableColumn>
					</TableHeader>
					<TableBody>
						<TableRow key='1'>
							<TableCell>✨ Дата регистрации</TableCell>
							<TableCell>{formattedDate}</TableCell>
						</TableRow>
						<TableRow key='2'>
							<TableCell>❤️ Избранные подарки</TableCell>
							<TableCell>{user.favorites?.length ?? 0}</TableCell>
						</TableRow>
						<TableRow key='3'>
							<TableCell>👀 Просмотрено подарков</TableCell>
							<TableCell>{user.history?.length ?? 0}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Button variant='flat' color='danger' onClick={onUserLogout}>
					Выйти с аккаунта
				</Button>
			</BackgroundColorSpin>
		</div>
	);
});

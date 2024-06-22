'use client';

import { getUserAuthData, getUserState } from '@/entities/user';
import { ModalAuth, useAuth } from '@/features/auth';
import { useFavoritesProducts } from '@/features/favorites';
import { ConvertData } from '@/shared/lib/features';
import { BackgroundColorSpin } from '@/shared/ui/animate-background';
import { Button as MyButton } from '@/shared/ui/button';
import { ErrorScreen } from '@/shared/ui/errors';
import { PageLoader } from '@/shared/ui/page-loader';
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
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ProfilePageProps } from '../../../app/profile/page';
import cls from './profile-page.module.scss';

export const ProfilePage: FC<ProfilePageProps> = () => {
	const { data: user, isLoading, error } = useSelector(getUserState);
	const isUserLogged = useSelector(getUserAuthData);
	const { onUserLogout } = useAuth();
	const formattedDate = ConvertData(user?.createdAt);
	const { favoritesProducts } = useFavoritesProducts();

	const {
		isOpen: isOpenAuthModal,
		onOpen: onOpenAuthModal,
		onOpenChange: onOpenChangeAuthModal,
	} = useDisclosure();

	if (!isUserLogged) {
		return (
			<>
				<div className={cls.notAuth}>
					<ErrorScreen typeError='unauthorized' />
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
	}

	if (isLoading || !user) {
		return <PageLoader />;
	}

	if (error) {
		console.log(error);
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
						<TableRow key='4'>
							<TableCell>🤑 Сумма избранных подарков</TableCell>
							<TableCell>
								{favoritesProducts?.reduce((total, item) => {
									const price = item.markets?.[0]?.price || 0;
									return total + price;
								}, 0)}{' '}
								₽
							</TableCell>
						</TableRow>
						<TableRow key='5'>
							<TableCell>💸 Сумма избранных подарков без скидок</TableCell>
							<TableCell>
								{favoritesProducts?.reduce((total, item) => {
									const price =
										item.markets?.[0]?.oldPrice ||
										item.markets?.[0]?.price ||
										0;
									return total + price;
								}, 0)}{' '}
								₽
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Button variant='flat' color='danger' onClick={onUserLogout}>
					Выйти из аккаунта
				</Button>
			</BackgroundColorSpin>
		</div>
	);
};

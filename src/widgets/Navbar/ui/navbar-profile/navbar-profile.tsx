'use client';

import { getUserState } from '@/entities/user';
import { UserIcon } from '@/shared/assets/icon/User';
import { Avatar } from '@/shared/ui/avatar';
import { DropdownProfile } from '@/widgets/dropdown-profile';
import { useSelector } from 'react-redux';

export const NavbarProfile = () => {
	const { data: user, isLoading, error } = useSelector(getUserState);

	return (
		<DropdownProfile>
			<Avatar
				isBordered
				src={
					user?.avatar &&
					`${process.env.UPLOADS}/avatars/${user?.id}/${user.avatar}`
				}
				fallback={<UserIcon color='white' />}
				color='primary'
				alt='Иконка пользователя'
			/>
		</DropdownProfile>
	);
};

'use client';

import { getUserData } from '@/entities/user';
import { UserIcon } from '@/shared/assets/icon/User';
import { Avatar } from '@/shared/ui/avatar';
import { DropdownProfile } from '@/widgets/dropdown-profile';
import { memo } from 'react';
import { useSelector } from 'react-redux';

export const NavbarProfile = memo(() => {
	const user = useSelector(getUserData);

	return (
		<DropdownProfile>
			<Avatar
				isBordered
				src={user?.avatar}
				fallback={<UserIcon />}
				alt='Иконка пользователя'
			/>
		</DropdownProfile>
	);
});

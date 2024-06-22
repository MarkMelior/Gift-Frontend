'use client';

import { getUserState } from '@/entities/user';
import { UserIcon } from '@/shared/assets/icon/User';
import { Avatar } from '@/shared/ui/avatar';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { DropdownProfile } from '@/widgets/dropdown-profile';
import { useSelector } from 'react-redux';

export const NavbarProfile = () => {
	const { data: user } = useSelector(getUserState);

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

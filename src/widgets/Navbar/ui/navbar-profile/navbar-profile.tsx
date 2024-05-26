import { fetcher } from '@/shared/api/fetcher';
import { UserIcon } from '@/shared/assets/icon/User';
import { Avatar } from '@/shared/ui/avatar';
import { DropdownProfile } from '@/widgets/dropdown-profile';
import { UserResponse } from '@melior-gift/zod-contracts';
import { memo } from 'react';
import useSWR from 'swr';

export const NavbarProfile = memo(() => {
	// const user = await getUser();
	const { data: user } = useSWR<UserResponse>('/api/user', fetcher);

	return (
		<DropdownProfile>
			<Avatar
				isBordered
				src={
					user?.avatar &&
					`${process.env.UPLOADS}/avatars/${user?.id}/${user.avatar}`
				}
				fallback={<UserIcon />}
				color='primary'
				alt='Иконка пользователя'
			/>
		</DropdownProfile>
	);
});

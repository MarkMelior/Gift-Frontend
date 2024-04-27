import { ProfilePage } from '@/views';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
	title: 'Melior Gift - Профиль',
};

export interface ProfilePageProps {
	params: { profile: string };
}

const Profile: FC<ProfilePageProps> = ({ params }) => {
	return <ProfilePage params={params} />;
};

export default Profile;

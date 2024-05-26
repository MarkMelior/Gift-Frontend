import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	const cookieStore = cookies();

	cookieStore.delete('accessToken');
	cookieStore.delete('refreshToken');

	return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}

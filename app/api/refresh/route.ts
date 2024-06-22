import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const refreshToken = req.cookies.get('refreshToken')?.value;
	if (!refreshToken) {
		return NextResponse.json(
			{ message: 'Refresh token not found' },
			{ status: 401 },
		);
	}

	try {
		const response = await axios.post(
			'http://localhost:8000/api/auth/refresh',
			{},
			{
				withCredentials: true,
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
				},
			},
		);

		const res = NextResponse.json(response.data);
		res.cookies.set('accessToken', response.data.access_token, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000,
			path: '/',
		});

		return res;
	} catch (error) {
		return NextResponse.json(
			{ message: 'Could not refresh token' },
			{ status: 401 },
		);
	}
}

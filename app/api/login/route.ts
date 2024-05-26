import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const response = await axios.post(
			'http://localhost:8000/api/auth/login',
			body,
			{
				withCredentials: true,
			},
		);

		const res = NextResponse.json(response.data);

		// res.cookies.set('refreshToken', response.data.refresh_token, {
		// 	httpOnly: true,
		// 	maxAge: 7 * 24 * 3600 * 1000,
		// 	path: '/',
		// });
		// res.cookies.set('accessToken', response.data.access_token, {
		// 	httpOnly: true,
		// 	maxAge: 15 * 60 * 1000,
		// 	path: '/',
		// });

		const setCookieHeader = response.headers['set-cookie'];
		if (setCookieHeader) {
			const refreshToken = setCookieHeader.find((cookie: string) =>
				cookie.includes('refreshToken'),
			);
			const accessToken = setCookieHeader.find((cookie: string) =>
				cookie.includes('accessToken'),
			);

			if (refreshToken) {
				res.cookies.set(
					'refreshToken',
					refreshToken.split('=')[1].split(';')[0],
					{
						httpOnly: true,
						maxAge: 7 * 24 * 3600 * 1000,
						path: '/',
					},
				);
			}

			if (accessToken) {
				res.cookies.set(
					'accessToken',
					accessToken.split('=')[1].split(';')[0],
					{
						httpOnly: true,
						maxAge: 15 * 60 * 1000,
						path: '/',
					},
				);
			}
		}

		return res;
	} catch (error) {
		return NextResponse.json(
			{ message: 'Invalid credentials' },
			{ status: 401 },
		);
	}
}

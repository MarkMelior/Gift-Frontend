import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const accessToken = req.cookies.get('accessToken')?.value;

	if (!accessToken) {
		return NextResponse.json(
			{ message: 'Access token not found' },
			{ status: 401 },
		);
	}

	try {
		const response = await axios.get('http://localhost:8000/api/users', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return NextResponse.json(response.data);
	} catch (error: any) {
		return NextResponse.json(
			{ message: 'Error fetching user data' },
			{ status: error.response?.status || 500 },
		);
	}
}

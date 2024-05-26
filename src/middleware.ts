// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
// 	const accessToken = request.cookies.get('accessToken')?.value;
// 	if (!accessToken) {
// 		return NextResponse.redirect(new URL('/login', request.url));
// 	}

// 	// ! Валидация токена может быть добавлена здесь

// 	return NextResponse.next();
// }

// export const config = {
// 	matcher: ['/protected/:path*'],
// };

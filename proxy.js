import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const protectedRoutes = ['/profile', '/admin/profile']

async function verifyJWT(token) {
	try {
		const secret = new TextEncoder().encode(process.env.SECRET_ACCESS_TOKEN)
		const { payload } = await jwtVerify(token, secret)
		return payload
	} catch (err) {
		return null
	}
}

export async function proxy(req) {
	const { pathname } = req.nextUrl

	if (pathname.startsWith('/api') || pathname.includes('/login')) {
        return NextResponse.next()
    }

	// if (protectedRoutes.some(path => pathname.startsWith(path))) {
	// 	const token = req.cookies.get('token')?.value

	// 	if (!token) {
	// 		const loginUrl = new URL('/login', req.url)
	// 		loginUrl.searchParams.set('from', pathname)
	// 		return NextResponse.redirect(loginUrl)
	// 	}

	// 	const valid = await verifyJWT(token)

	// 	if (!valid) {
	// 		const loginUrl = new URL('/login', req.url)
	// 		loginUrl.searchParams.set('from', pathname)
	// 		return NextResponse.redirect(loginUrl)
	// 	}
	// }

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*', '/admin/profile/:path*'],
}

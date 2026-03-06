import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Middleware runs on the Edge, so we use `jose` instead of jsonwebtoken
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_insecure_secret_for_development_only_12345'
);

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (but not /admin/login)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_session')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            // Token is valid, proceed
            return NextResponse.next();
        } catch (err) {
            // Token invalid or expired
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

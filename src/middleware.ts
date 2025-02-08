"use server"
import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('X_APP_1')?.value
    const path = request.nextUrl.pathname

    if (path.startsWith('/admin')) {
        if (!accessToken) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next()
}



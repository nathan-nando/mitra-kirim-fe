import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('X_APP_1')?.value
    const path = request.nextUrl.pathname

    if (path.startsWith('/admin')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

import { NextResponse, NextRequest } from "next/server";

const authenticated = true;

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/api/todos") {
        const response = NextResponse.next();
        console.log(response)
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!authenticated) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
// export const config = {
//     matcher: ["/home", "/index"]
// }
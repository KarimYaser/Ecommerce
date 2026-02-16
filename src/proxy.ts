import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/profile", "/orders", "/wishlist", "/cart", "/checkout"]

const authRoutes = ["/login", "/signup", "/forget-password","/reset-password"]

export default function Proxy(request: NextRequest) {
  const {pathname}=request.nextUrl
  const token= request.cookies.get("token")?.value || null

  const isAuthenticated = !!token;

  const isProtectedRoute =   protectedRoutes.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
);
const isAuthRoute = authRoutes.some((route) =>
  pathname === route || pathname.startsWith(`${route}/`)
);

if(isProtectedRoute && !isAuthenticated){
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl)
}
if(isAuthRoute && isAuthenticated){
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl)
}
    return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/orders/:path*", "/wishlist/:path*", "/cart/:path*", "/checkout/:path*","/login","/signup","/forget-password","/reset-password"],
}
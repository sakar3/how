import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Add paths that require authentication
  const protectedPaths = ["/create", "/profile"]
  
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.url))
  }

  return null
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
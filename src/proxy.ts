import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const authorizedEmail = ["ayankumar.akd@gmail.com", "ayanakd112@gmail.com"]

export default withAuth(
  function middleware(req) {
    const user = req.nextauth.token

    if (user?.email && !authorizedEmail.includes(user?.email)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Allow only authenticated users
    },
  }
)

export const config = { matcher: ["/dashboard", "/dashboard/:path*"] }

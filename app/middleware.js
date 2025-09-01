// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;

//   const { pathname } = req.nextUrl;

//   // If logged in and trying to access /login → redirect to dashboard
//   if (token && pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/dashboard/buyer", req.url));
//   }

//   // If not logged in and trying to access /dashboard → redirect to login
//   if (!token && pathname.startsWith("/dashboard/buyer")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", ], // paths where middleware should run
// };

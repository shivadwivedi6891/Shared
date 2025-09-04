import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get subscription status and token from cookies
  // const subscription = request.cookies.get('subscription');
  const token = request.cookies.get('token');

  // Redirect if subscription is approved and user tries to access BankAccount page
  // if (subscription === 'Approved' && request.nextUrl.pathname === '/BankAccount') {
  //   return NextResponse.redirect(new URL('/dashboard/buyer', request.url));
  // }

  // Instantly redirect authenticated users away from /login and /register
  if (token && ['/login', '/register'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard/buyer', request.url));
  }

  // No public route logic needed, so nothing to remove
  return NextResponse.next();
}

export const config = {
  matcher: [ '/login', '/register'],
};

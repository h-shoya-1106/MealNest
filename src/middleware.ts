import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('__Secure-next-auth.session-token')?.value ||
                request.cookies.get('next-auth.session-token')?.value;

  const isLoggedIn = Boolean(token);
  const isAuthPage = ['/login', '/register'].includes(request.nextUrl.pathname);

  // 未ログインユーザーが保護されたページにアクセス → /login にリダイレクト
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ログイン済ユーザーが /login または /register にアクセス → /home にリダイレクト
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};

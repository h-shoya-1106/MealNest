import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATHS } from './constants/paths';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('__Secure-next-auth.session-token')?.value ||
                request.cookies.get('next-auth.session-token')?.value;

  const isLoggedIn = Boolean(token);
  const isAuthPage = [PATHS.LOGIN, PATHS.REGISTER].includes(request.nextUrl.pathname);

  // 未ログインユーザーが保護されたページにアクセス → /login にリダイレクト
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL(PATHS.LOGIN, request.url));
  }

  // ログイン済ユーザーが /login または /register にアクセス → /home にリダイレクト
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL(PATHS.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};

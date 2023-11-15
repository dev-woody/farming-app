import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("accessToken");
  if (!jwt) {
      return NextResponse.redirect(new URL('/signIn', request.url))
  }
	
	// 로그인 상태면 원래 요청한 경로로 이동한다.
  return NextResponse.next();
  
}

export const config = {
  matcher: ['/mypage/:path*'],
}
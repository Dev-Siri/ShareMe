import { NextResponse, userAgent, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { isBot } = userAgent(request);
  const token = request.cookies.get("auth_token")?.value;
  const onLoginPage = request.nextUrl.pathname.startsWith("/login");
  const onStudioPage = request.nextUrl.pathname.startsWith("/studio");

  if (isBot || onStudioPage) return NextResponse.next();

  if (!onLoginPage && !token)
    return NextResponse.redirect(new URL("/login", request.url));

  if (onLoginPage && token)
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|static|.*\\..*|_next).*)"],
};

import { NextResponse } from "next/server";

export function middleware(request) {
  let isLoggedIn = request.cookies.get("user_token")?.value ? true : false;
  const redirectURL = request.nextUrl.clone();
  if (isLoggedIn && request.nextUrl.pathname === "/login") {
    redirectURL.pathname = "/";
    return NextResponse.redirect(redirectURL);
  } else if (
    !isLoggedIn &&
    (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/admin")
  ) {
    redirectURL.pathname = "/login";
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin"],
};

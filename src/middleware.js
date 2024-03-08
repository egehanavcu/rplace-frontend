import { NextResponse } from "next/server";

export function middleware(request) {
  let isLoggedIn = request.cookies.get("user_token")?.value ? true : false;
  let isAdmin = request.cookies.get("isAdmin")?.value ? true : false;
  const redirectURL = request.nextUrl.clone();
  redirectURL.search = "";
  if (isLoggedIn && request.nextUrl.pathname === "/login") {
    redirectURL.pathname = "/";
    return NextResponse.redirect(redirectURL);
  } else if (
    !isLoggedIn &&
    (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/admin")
  ) {
    redirectURL.pathname = "/login";
    return NextResponse.redirect(redirectURL);
  } else if (!isAdmin && request.nextUrl.pathname === "/admin") {
    redirectURL.pathname = "/";
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin"],
};

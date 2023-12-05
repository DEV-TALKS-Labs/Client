import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = { matcher: ["/:id/"] };

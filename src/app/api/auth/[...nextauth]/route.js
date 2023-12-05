// route.js
import NextAuth from "next-auth";
import { options } from "./options";

const hendler = NextAuth(options);

export { hendler as GET, hendler as POST };

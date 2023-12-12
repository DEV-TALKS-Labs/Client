import GitHubPorvider from "next-auth/providers/github";
import GooglePorvider from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubPorvider({
      profile(profile) {
        // console.log("profile GitHub: ", profile);

        return {
          ...profile,
          id: profile.node_id,
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GooglePorvider({
      profile(profile) {
        // console.log("profile Google: ", profile);

        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      token.rawJwt = token.accessToken;

      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user }) {

      //TODO: add server Token
      const addUser = await fetch(process.env.SERVER_API_URL+"users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          imageUrl: user.image,
        }),
      });
      return true;
    },
  },
};

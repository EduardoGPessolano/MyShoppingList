import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type SessionProps = {
  session: any;
  token: any;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const urlBase = "http://localhost:3005/my_shopping_list";
        try {
          const response = await fetch(`${urlBase}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          console.log("--->react: ", response);

          if (!response.ok) {
            console.log("Error fetching user data:", response.status);
            return null;
          }

          const user = await response.json();
          console.log(user);

          if (user && user.token) {
            return {
              id: user.user_id,
              name: user.name,
              email: user.email,
              token: user.token,
            };
          }

          console.log("Invalid credentials", credentials);
          return null;
        } catch (error) {
          console.error("Fetch failed:", error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Salvar o token JWT na sessão
      if (user) {
        token.jwt = user.token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: SessionProps) {
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.jwt;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

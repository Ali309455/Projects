import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/app/db/connectDB"
import User from "@/app/models/User";

const authOptions = NextAuth({
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }), 
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log(credentials)
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })

      
  ], callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //  if(account.provider == "github") { 
        await connectDB()
        // Check if the user already exists in the database
        const currentUser =  await User.findOne({email: email}) 
        if(!currentUser){
          // Create a new user
           const newUser = await User.create({
            email: user.email, 
            username: user.email.split("@")[0], 
            uniquename: user.email.split("@")[0]
          })   
        // } 
        return true
       }
    },
    
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.uniquename
      return session
    },
  } 
})

export {authOptions as GET, authOptions as POST}
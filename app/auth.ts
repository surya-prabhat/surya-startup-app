import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { createClient } from "next-sanity"

const sanityClinet = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-08-20",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    })],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({user, account, profile }) {
      try {

        console.log('--- SIGN IN CALLBACK LOGS ---');
        console.log('User:', user);
        console.log('Profile:', profile);

        // Check if user and profile data are valid
        if (!profile?.login) {
          console.error('GitHub profile login is missing.');
          return false;
        }

        const githubId = profile?.login
        console.log('Extracted GitHub ID:', githubId);

        if (!githubId) {
          throw new Error("github login not found in profile")
        }

        const query = `*[_type == "author" && githubId == $githubId][0]`
        const params = {githubId}
        const existingUser = await sanityClinet.fetch(query, params)

        if (!existingUser) {
          const newUserDoc = {
            _id: `github-author-${githubId}`,
            _type: 'author',
            githubId: githubId,
            name: user.name,
            profileImage: user.image,
            handle: githubId
          }

          await sanityClinet.create(newUserDoc)
          console.log("New User created in sanity:", newUserDoc)

        }

        return true
      } catch (error) {
        console.error("error saving user to sanity:", error)
        return false
      }
    }
  }
})
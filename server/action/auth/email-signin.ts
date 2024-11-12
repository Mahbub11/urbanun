"use server";
import { actionClient } from "@/lib/safe-action";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schema/auth/Login_schema";
import prisma from "@/lib/prisma";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs"; // Import bcrypt
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { isRedirectError } from "next/dist/client/components/redirect";

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: { email: { equals: email } },
      });

      // Return early if the user is not found
      if (!existingUser) {
        return { error: "Email Not Found" };
      }

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return { error: "Email or Password Incorrect" };
      }

      // Proceed with sign-in
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });

      return { success: "User Signed In!" };
    } catch (error) {
      console.log(error);
      if (isRedirectError(error)) {
        console.error("Redirect error!: ", error);
        throw error;
      }

      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Something went wrong" };
        }
      }
      return { error: "Something went wrong" };
    }
  });

"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail, isUserGoogleAccount } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Недопустимые поля!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Электронная почта не существует!" };
  }

  const isGoogleUser = await isUserGoogleAccount(existingUser.id);

  if (isGoogleUser) {
    return { error: "Эта почта привязана к Google входу!" };
  }

  if (!existingUser.email || !existingUser.password) {
    return { error: "Электронная почта не существует!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Подтверждающее письмо отправлено!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Недопустимые учетные данные!" };
        default:
          return { error: "Что-то пошло не так!" };
      }
    }

    throw error;
  }
};

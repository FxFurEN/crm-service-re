import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const isUserGoogleAccount = async (userId: string) => {
  try {
    const accounts = await db.account.findMany({
      where: {
        userId: userId,
      },
    });

    for (let account of accounts) {
      if (account.provider === 'google') {
        return true;
      }
    }

    return false;
  } catch {
    return null;
  }
};

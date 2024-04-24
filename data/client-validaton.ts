import { db } from "@/lib/db";

export const checkClientExistsByEmail = async (email: string | null): Promise<boolean> => {
  if (!email) {
    return false; 
  }
  const existingClient = await db.clients.findFirst({
    where: {
      email,
    },
  })

  return !!existingClient; 
};

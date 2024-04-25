"use server";

import { db } from "@/lib/db";

export const deleteClient = async (clientId: string) => {
  try {
    await db.clients.delete({
      where: {
        id: clientId,
      },
    });

    return { success: "Клиент успешно удален!" };
  } catch (error) {
    console.error("Error deleting client:", error);
    return { error: "Что-то пошло не так" };
  }
};

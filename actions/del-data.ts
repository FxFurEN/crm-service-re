"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteClient = async (clientId: string) => {
  try {
    await db.clients.delete({
      where: {
        id: clientId,
      },
    });
    revalidateTag('allClients')
    return { success: "Клиент успешно удален!" };
  } catch (error) {
    console.error("Error deleting client:", error);
    return { error: "Что-то пошло не так" };
  }
};


export const deleteService = async (serviceId: string) => {
  try {
    await db.service.delete({
      where: {
        id: serviceId,
      },
    });
    revalidateTag('allServiceAndCategory');
    return { success: "Услуга успешно удалена!" };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { error: "Что-то пошло не так" };
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidateTag('allServiceAndCategory');
    return { success: "Category deleted!" };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { error: "What went wrong" };
  }
};



export const deleteStage = async (stageId: string) => {
  try {
    await db.stage.delete({
      where: {
        id: stageId,
      },
    });

    return { success: "Stage deleted!" };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { error: "What went wrong" };
  }
};
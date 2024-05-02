"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { CategorySchema, ClientSchema, OrderSchema, ServiceSchema } from "@/schemas";

export const updateClient = async (clientId: string, updatedData: z.infer<typeof ClientSchema>) => {
  try {
    const formSchema = updatedData.sign ? ClientSchema.corporate() : ClientSchema.individual();
    const validatedFields = formSchema.safeParse(updatedData);

    if (!validatedFields.success) {
      return { error: "Недопустимые поля!" };
    }

    const { email, phone, sign, initials, unp, name } = validatedFields.data;

    const updatedClient = await db.clients.update({
      where: {
        id: clientId,
      },
      data: {
        email,
        phone,
        sign,
        initials,
        unp,
        name,
      },
    });

    return { success: "Данные клиента успешно обновлены!", client: updatedClient };
  } catch (error) {
    console.error("Error updating client:", error);
    return { error: "Что-то пошло не так" };
  }
};

export const updateService = async (serviceId: string, updatedData: z.infer<typeof ServiceSchema>) => {
  try {
    const validatedFields = ServiceSchema.safeParse(updatedData);
    if (!validatedFields.success) {
      return { error: "Fields are not valid!" };
    }
    const { name, category } = validatedFields.data;
    const price = parseFloat(validatedFields.data.price); 
    
    const existingService = await db.service.findUnique({ where: { id: serviceId } });
    if (!existingService) {
      return { error: 'Услуга не найдена' };
    }

    const existingCategory = await db.category.findFirst({
      where: { id: category },
    });

    let categoryId;
    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await db.category.create({
        data: {
          name: category,
        },
      });
      categoryId = newCategory.id;
    }

    const updatedService = await db.service.update({
      where: { id: serviceId },
      data: {
        name,
        price,
        category: { connect: { id: categoryId } },
      },
    });

    return { success: "Данные услуги успешно обновлены!", service: updatedService };
  } catch (error) {
    console.error("Error updating service:", error);
    return { error: "Что-то пошло не так" };
  }
};


export const updateCategory = async (categoryId: string, updatedData: z.infer<typeof CategorySchema>) => {
  try {
    const validatedFields = CategorySchema.safeParse(updatedData);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const {  name } = validatedFields.data;

    const updatedCategory = await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return { success: "Category successfully updated!", category: updatedCategory };
  } catch (error) {
    console.error("Error updating client:", error);
    return { error: "What went wrong" };
  }
};


export const updateOrder = async (orderId: string, updatedData: z.infer<typeof OrderSchema>) => {
  try {
    const validatedFields = OrderSchema.safeParse(updatedData);
    if (!validatedFields.success) {
      return { error: "Fields are not valid!" };
    }
    const { createdAt, leadTime, comments, userId, clientId, serviceId } = validatedFields.data;

    const existingOrder = await db.orders.findUnique({ where: { id: orderId } });
    if (!existingOrder) {
      return { error: 'Заказ не найден' };
    }

    const updatedOrder = await db.orders.update({
      where: { id: orderId },
      data: {
        createdAt,
        leadTime,
        comments,
        userId,
        clientId,
        serviceId,
      },
    });

    return { success: "Данные заказа успешно обновлены!", order: updatedOrder };
  } catch (error) {
    console.error("Error updating order:", error);
    return { error: "Что-то пошло не так" };
  }
};

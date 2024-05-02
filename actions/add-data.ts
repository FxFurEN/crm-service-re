"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { CategorySchema, ClientSchema, OrderSchema, ServiceSchema } from "@/schemas";
import { checkClientExistsByEmail } from "@/data/client-validaton"; 

export const addClient = async (values: z.infer<typeof ClientSchema>) => {
  try {
    const formSchema = values.sign ? ClientSchema.corporate() : ClientSchema.individual();
    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Недопустимые поля!" };
    }
    const { email, phone, sign, initials, unp, name } = validatedFields.data;
    const clientExists = await checkClientExistsByEmail(email);

    if (clientExists) {
      return { error: "Клиент уже существует!" };
    }
    const newClient = await db.clients.create({
      data: {
        email,
        phone,
        sign,
        initials,
        unp,
        name,
      },
    });

    return { success: "Клиент успешно добавлен!", client: newClient };
  } catch (error) {
    console.error("Error adding client:", error);
    return { error: "Что-то пошло не так" };
  }
};


export const addService = async ({ name, price, categoryId }) => {
  try {
    const existingCategory = await db.category.findFirst({
      where: { id: categoryId },
    });

    let category;
    if (!existingCategory) {
      category = await db.category.create({
        data: {
          name: categoryId,
        },
      });
    }

    const service = await db.service.create({
      data: {
        name,
        price,
        category: { connect: { id: existingCategory ? categoryId : category.id } },
      },
    });

    return { success: 'Услуга успешно добавлена!', service };
  } catch (error) {
    console.error('Error adding service:', error);
    return { error: 'Что-то пошло не так' };
  }
};


export const addCategory = async (values: z.infer<typeof CategorySchema>) => {
  try {
    const validatedFields = CategorySchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { name } = validatedFields.data;
    const newCategory = await db.category.create({
      data: {
        name,
      },
    });

    return { success: "Category added!", client: newCategory };
  } catch (error) {
    console.error("Error adding client:", error);
    return { error: "What's wrong" };
  }
};



export const addOrder = async (values: z.infer<typeof OrderSchema>) => {
  try {
    const validatedFields = OrderSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { createdAt, comments, leadTime, userId, clientId, serviceId } = validatedFields.data;

    const newOrderStage = await db.stage.findFirst({
      where: {
        name: "Новый заказ"
      }
    });

    if (!newOrderStage) {
      return { error: "New Order stage not found" };
    }

    const newOrder = await db.orders.create({
      data: {
        createdAt,
        comments,
        leadTime,
        userId,
        clientId,
        serviceId,
        execution: {
          create: {
            name: "Заказ добавлен",
            executionDate: new Date(),
            stage: {
              connect: {
                id: newOrderStage.id
              }
            },
            user: {
              connect: {
                id: userId 
              }
            }
          }
        }
      },
      include: {
        execution: true
      }
    });

    return { success: "Order added!", order: newOrder };
  } catch (error) {
    console.error("Error adding order:", error);
    return { error: "Something went wrong" };
  }
};



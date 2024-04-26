"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { ClientSchema, ServiceSchema } from "@/schemas";
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


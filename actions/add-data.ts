"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { ClientSchema } from "@/schemas";
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

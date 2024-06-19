"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { CategorySchema, ClientSchema, ExecutionSchema, OrderSchema, ServiceSchema, StageSchema } from "@/schemas";
import { checkClientExistsByEmail } from "@/data/client-validaton"; 

interface ClientSchemaType {
  individual: () => z.ZodObject<{
    email: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    sign: z.ZodBoolean;
    initials: z.ZodNullable<z.ZodString>;
  }>;
  corporate: () => z.ZodObject<{
    email: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    sign: z.ZodBoolean;
    name: z.ZodNullable<z.ZodString>;
    unp: z.ZodNullable<z.ZodString>;
  }>;
}

export const addClient = async (values: z.infer<ReturnType<ClientSchemaType["individual"]> | ReturnType<ClientSchemaType["corporate"]>>) => {
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
        category: { connect: { id: existingCategory ? categoryId : category?.id } },
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


export const addStage = async (values: z.infer<typeof StageSchema>) => {
  try {
    const validatedFields = StageSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { name, color } = validatedFields.data;
    const newStage = await db.stage.create({
      data: {
        name,
        color,
      },
    });

    return { success: "Stage added!", stage: newStage };
  } catch (error) {
    console.error("Error adding client:", error);
    return { error: "What's wrong" };
  }
};



export const addExecution = async (orderId: string, userId: string, values: z.infer<typeof ExecutionSchema>) => {
  try {
    const validatedFields = ExecutionSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }
    const { name, stageId, userId, orderId } = validatedFields.data;
    const newExecution = await db.execution.create({
      data: {
        name,
        executionDate: new Date(),
        userId,
        orderId,
        stageId,
      },
    });

    return { success: "Execution added!", execution: newExecution };
  } catch (error) {
    console.error("Error adding execution:", error);
    return { error: "Something went wrong" };
  }
};
import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Почта не может быть пустым!",
  }),
  password: z.string().min(1, {
    message: "Пароль не может быть пустым!",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Почта не может быть пустым!",
  }),
  password: z.string().min(6, {
    message: "Минимальное количество символов: 6",
  }),
  name: z.string().min(1, {
    message: "Имя не может быть пустым!",
  }),
});


export const ClientSchema = {
  individual: () =>
    z.object({
      email: z.string().email({
        message: "Почта не может быть пустым!",
      }),
      phone: z.string().regex(/^\+375\s(29|44|25)\s\d{3}-\d{2}-\d{2}$/,{ 
          message: "Неверный формат номера!" }).min(1, {
          message: "Номер не может быть пустым!",
      }).nullable(),
      sign: z.boolean(),
      initials: z.string().min(1, {
        message: "ФИО не может быть пустым!",
      }).nullable(),
    }),
  corporate: () =>
    z.object({
      email: z.string().email({
        message: "Почта не может быть пустым!",
      }),
      phone: z.string().regex(/^\+375\s(29|44|25)\s\d{3}-\d{2}-\d{2}$/,{ 
          message: "Неверный формат номера!" }).min(1, {
          message: "Номер не может быть пустым!",
      }).nullable(),
      sign: z.boolean(),
      name: z.string().min(1, {
        message: "Название компании не может быть пустым!",
      }).nullable(),
      unp: z.string().min(1, {
        message: "УНП не может быть пустым!",
      }).max(8).nullable(),
    }),
};



export const ServiceSchema = z.object({
  name: z.string().min(1, {
    message: "Имя не может быть пустым!",
  }),
  price: z.string().min(1, {
    message: "Цена не может быть пустым!",
  }).refine((price) => {
    const numericPrice = parseFloat(price);
    return numericPrice > 0;
  }, {
    message: "Цена должна быть больше нуля!",
  }),
  categoryId: z.string().min(1, {
    message: "Категория не может быть пустой!",
  }),
});


export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: "Имя не может быть пустым!",
  }).max(30, {
    message: "Название слишком велико!",
  }),
});


export const OrderSchema = z.object({
  createdAt: z.date(),
  comments: z.string().nullable(),
  leadTime: z.date(),
  userId: z.string().min(1, 
    { message: "Сотрудник не может быть пустым!" }),
  clientId: z.string().min(1, 
    { message: "Клиент не может быть пустым!" }),
  serviceId: z.string().min(1, 
    { message: "Услуга не может быть пустым!" }),
});


export const StageSchema = z.object({
  name: z.string().min(1, 
    { message: "Названия не может быть пустым!" }),
    color: z.string().optional(), 
});


export const ExecutionSchema = z.object({
  name: z.string().min(1, 
    { message: "Названия не может быть пустым!" }),
  userId: z.string(),
  orderId: z.string(),
  stageId: z.string(),
});
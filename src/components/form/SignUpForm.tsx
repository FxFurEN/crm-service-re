"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const FormSchema = z
  .object({
    username: z.string().min(1, 'Имя обязательно').max(100),
    email: z.string().min(1, 'Почта обязательна').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Пароль обязателен')
      .min(8, 'Пароль должен содержать не менее 8 символов'),
    confirmPassword: z.string().min(1, 'Подтвержения пароля обязателена'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Парольы не совпадают',
  });

export function SignUpForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      });
      
    const onSubmit =  async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })
        if(response.ok) {
            router.push('/sign-in');
        }else{
            console.error('Registration failed');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-2'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                        <Input placeholder='johndoe' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder='mail@example.com' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                        <Input
                            type='password'
                            placeholder='Введите пароль'
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Подтвержение пароля</FormLabel>
                        <FormControl>
                        <Input
                            placeholder='Введите подтвержение пароля'
                            type='password'
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <Button className='w-full mt-6' type='submit'>
                    Войти в систему
                </Button>
            </form>
        </Form>
    )
}

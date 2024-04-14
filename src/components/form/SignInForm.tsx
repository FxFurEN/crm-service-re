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
import { Toaster, toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from 'react'; 
import { Loader2 } from 'lucide-react';

const FormSchema = z
  .object({
    email: z.string().min(1, 'Обязательное поле').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Обязательное поле')
      .min(8, 'Пароль должен содержать не менее 8 символов'),
  })

export default function SignInForm() {
    const [loading, setLoading] = useState(false); 

    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      });
      
    const onSubmit =  async (values: z.infer<typeof FormSchema>) => {
        setLoading(true); // Устанавливаем состояние загрузки в true
        try {
            const signInData = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (signInData?.error) {
                toast.error("Ошибка: " + signInData.error);
            } else {
                toast.success("Авторизация прошла успешно");
                router.push('/home');
            }
        } catch (error) {
            toast.error('Ошибка при отправке формы');
        } finally {
            setLoading(false); 
        }
            
    };

    return (
        <main className="flex justify-center items-center h-screen p-5">
            <Toaster richColors  />
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle className="text-2xl">Вход в систему</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                            <div className='space-y-2'>
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
                            </div>
                            {loading ? (
                                <Button disabled className='w-full mt-6'>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Загрузка...
                                </Button>
                            ) : (
                                <Button className='w-full mt-6' type='submit'>
                                    Войти в систему
                                </Button>
                            )}
                        </form>
                        <Label>Нет аккаунта? - <Link href="/sign-up" style={{color: 'blue'}}>Зарегистрируйтесь</Link></Label>
                    </Form>
                </CardContent>
            </Card>
        </main>
      
    )
}

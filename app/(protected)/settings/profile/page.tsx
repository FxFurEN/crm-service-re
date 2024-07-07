'use client'

import { settings } from '@/actions/settings'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useCurrentUser } from '@/hooks/use-current-user'
import { SettingsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { Metadata } from 'next'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const metadata: Metadata = {
	title: 'Профиль',
}

const SettingsPage = () => {
	const user = useCurrentUser()

	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	const { update } = useSession()
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			password: undefined,
			newPassword: undefined,
			name: user?.name || undefined,
			email: user?.email || undefined,
			role: user?.role || undefined,
		},
	})

	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		startTransition(() => {
			settings(values)
				.then(data => {
					if (data.error) {
						setError(data.error)
					}

					if (data.success) {
						update()
						setSuccess(data.success)
					}
				})
				.catch(() => setError('Что-то пошло не так!'))
		})
	}

	return (
		<Card className='w-full'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>⚙️ Профиль</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>ФИО</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='John Doe'
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
								<>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Почта</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='example@gmail.com'
														type='email'
														disabled={isPending}
													/>
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
														{...field}
														placeholder='******'
														type='password'
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='newPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Новый пароль</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder='******'
														type='password'
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
							<FormField
								control={form.control}
								name='role'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Роль</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Выберите роль' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={UserRole.ADMIN}>
													Администратор
												</SelectItem>
												<SelectItem value={UserRole.USER}>Сотрудник</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button isLoading={isPending} type='submit'>
							Сохранить
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default SettingsPage

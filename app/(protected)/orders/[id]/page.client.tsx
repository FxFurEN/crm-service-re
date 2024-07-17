'use client'

import { DialogModalChangeStages } from '@/components/orders/dialog-modal-change-stage'
import { SkeletonCard } from '@/components/skeleton-card'
import { DialogModal } from '@/components/templates/dialog-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Tag } from 'antd'
import { formatDate } from 'date-fns'
import { History } from 'lucide-react'
import { useState } from 'react'

const OrderDetailPage = ({ order, executionHistory }) => {
	const [open, setOpen] = useState(false)
	const [openTempate, setOpenTempate] = useState(false)
	const [isPending, setIsPending] = useState(false)

	return (
		<div>
			<>
				<div className='flex items-start flex-col md:flex-row ml-5 mb-5'>
					<Button
						isLoading={isPending}
						onClick={() => setOpen(true)}
						className='w-[95%] md:w-auto md:ml-0 mb-3 md:mb-0'
					>
						Изменить статус заказа
					</Button>
					<Button
						isLoading={isPending}
						onClick={() => setOpenTempate(true)}
						className='w-[95%] md:w-auto md:ml-3 mb-3'
					>
						Печатать
					</Button>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								isLoading={isPending}
								className='w-[95%] md:w-auto md:ml-3'
							>
								<History size={24} />
							</Button>
						</SheetTrigger>
						<SheetContent>
							<ScrollArea className='h-[400px] w-full rounded-md'>
								{executionHistory.map(execution => (
									<div key={execution.id}>
										<p>
											{execution.name !== 'Заказ добавлен' &&
											execution.name !== 'Заказ обновлен' ? (
												<>
													<span className='text-500'>{execution.name} </span>
													<Tag color={execution.stage.color}>
														{execution.stage.name}
													</Tag>
												</>
											) : execution.name === 'Заказ обновлен' ? (
												<span className='text-green-500'>
													Информация о заказе была обновлена
												</span>
											) : (
												<Tag color={execution.stage.color}>
													{execution.stage.name}
												</Tag>
											)}
										</p>
										<p
											className='text-gray-800 text-sm'
											suppressHydrationWarning
										>
											{formatDate(execution.executionDate, 'dd.MM.yy HH:mm')}{' '}
											<span className='text-gray-400'>
												{execution.user.name}
											</span>
										</p>
										<Separator className='my-2' />
									</div>
								))}
							</ScrollArea>
						</SheetContent>
					</Sheet>
				</div>
				<div className='w-full px-4'>
					<Card>
						<CardHeader>
							<p className='text-2xl font-semibold text-center'>
								Информация о заказе и клиенте
							</p>
						</CardHeader>
						<CardContent>
							<div className='flex flex-col md:flex-row'>
								<div className='w-full md:w-1/2 px-4 mb-4 md:mb-0'>
									{order ? (
										<>
											<Label htmlFor='orderCreatedAt'>
												Дата создания заказа:{' '}
												{formatDate(order.createdAt, 'dd.MM.yyyy')}
											</Label>
											<Separator className='my-2' />
											<Label htmlFor='orderLeadTime'>
												Предварительная дата выполнения заказа:{' '}
												{formatDate(order.leadTime, 'dd.MM.yyyy')}
											</Label>
											<Separator className='my-2' />
											<Label htmlFor='orderService'>
												Услуга: {order.service.name}
											</Label>
											<Separator className='my-2' />
											<Label htmlFor='orderService'>
												Принял заказ: {order.user.name}
											</Label>
											<Separator className='my-2' />
											<Label htmlFor='orderComments'>
												Комментарии к заказу:
											</Label>
											<Textarea
												value={order.comments}
												className='resize-none'
												readOnly
											/>
										</>
									) : (
										<SkeletonCard />
									)}
								</div>
								<div className='w-full md:w-1/2 px-4'>
									{order ? (
										<>
											{order.client.sign === false ? (
												<>
													<Label htmlFor='initials'>
														ФИО: {order.client.initials}
													</Label>
													<Separator className='my-2' />
													<Label htmlFor='email'>
														Email: {order.client.email}
													</Label>
													<Separator className='my-2' />
													<Label htmlFor='phone'>
														Телефон: {order.client.phone}
													</Label>
													<Separator className='my-2' />
												</>
											) : (
												<>
													<Label htmlFor='name'>
														Название компании: {order.client.name}
													</Label>
													<Separator className='my-2' />
													<Label htmlFor='unp'>УНП: {order.client.unp}</Label>
													<Separator className='my-2' />
													<Label htmlFor='email'>
														Почта: {order.client.email}
													</Label>
													<Separator className='my-2' />
													<Label htmlFor='phone'>
														Телефон: {order.client.phone}
													</Label>
													<Separator className='my-2' />
												</>
											)}
											{order.client.deletedAt ? (
												<>
													<Label
														htmlFor='deletedClient'
														className='text-red-500'
													>
														Клиент был удален:{' '}
														{formatDate(order.client.deletedAt, 'dd.MM.yyyy')}
													</Label>
													<Separator className='my-2' />
												</>
											) : null}
										</>
									) : (
										<SkeletonCard />
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</>
			<DialogModal
				open={openTempate}
				onOpenChange={setOpenTempate}
				orderId={order.id}
			/>
			<DialogModalChangeStages
				open={open}
				onOpenChange={setOpen}
				orderId={order.id}
			/>
		</div>
	)
}

export default OrderDetailPage

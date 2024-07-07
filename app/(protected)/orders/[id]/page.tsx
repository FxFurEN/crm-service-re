import { getOrderById, getOrderExecutionHistory } from '@/actions/data-load'
import { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { cache } from 'react'
import OrderDetailPage from './page.client'

export const metadata: Metadata = {
	title: 'Подробности о заказе',
}

const OrderDatailPage = cache(
	async ({ params }: { params: { id: string } }) => {
		const { id } = params
		const order = await getOrderById(id)
		const executionHistory = await getOrderExecutionHistory(id)

		revalidateTag('allHistory')

		return <OrderDetailPage order={order} executionHistory={executionHistory} />
	}
)

export default OrderDatailPage

import { getClientById, getClientOrders } from '@/actions/data-load'
import { Metadata } from 'next'
import { cache } from 'react'
import ClientDetailPage from './page.client'

export const metadata: Metadata = {
	title: 'Подробности о клиенте',
}

const ServerClientDetailPage = cache(
	async ({ params }: { params: { id: string } }) => {
		const { id } = params
		const client = await getClientById(id)
		const clientOrders = await getClientOrders(id)

		return <ClientDetailPage client={client} clientOrders={clientOrders} />
	}
)

export default ServerClientDetailPage

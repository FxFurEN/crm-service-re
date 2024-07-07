import { getAllClients } from '@/actions/data-load'
import { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { cache } from 'react'
import ClientsСomponentPage from './page.client'

export const metadata: Metadata = {
	title: 'Клиенты',
}

const ClientsPage = cache(async () => {
	const clients = await getAllClients()
	const transformedClients = clients?.map(client => ({
		...client,
		name: client.name ? client.name : client.initials,
	}))

	revalidateTag('allClients')

	return <ClientsСomponentPage clients={transformedClients} />
})

export default ClientsPage

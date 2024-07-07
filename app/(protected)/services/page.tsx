import { getAllCategories, getAllServices } from '@/actions/data-load'
import AccessPage from '@/components/access.denied'
import { currentRole } from '@/lib/auth'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import ServicesPage from './page.client'

export const metadata: Metadata = {
	title: 'Услуги',
}

const ServerServicesPage = cache(async () => {
	const userRole = await currentRole()

	if (userRole !== 'ADMIN') {
		return <AccessPage />
	}

	const servicesData = await getAllServices()
	const categoriesData = await getAllCategories()

	const transformedServices = servicesData?.map(service => ({
		...service,
		categoryName: service.category.name,
	}))

	revalidatePath('/services')

	return (
		<ServicesPage
			initialServices={transformedServices}
			initialCategories={categoriesData}
		/>
	)
})

export default ServerServicesPage

import { getAllStages } from '@/actions/data-load'
import AccessPage from '@/components/access.denied'
import { currentRole } from '@/lib/auth'
import { Metadata } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cache } from 'react'
import StagesPage from './page.client'

export const metadata: Metadata = {
	title: 'Статусы',
}

const ServerStagesPage = cache(async () => {
	const stages = await getAllStages()
	const userRole = await currentRole()

	if (userRole !== 'ADMIN') {
		return <AccessPage />
	}

	revalidateTag('allStages')
	revalidatePath('/settings/stages')
	return <StagesPage stages={stages} />
})

export default ServerStagesPage

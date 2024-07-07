import { getAllEmployees } from '@/actions/data-load'
import AccessPage from '@/components/access.denied'
import { currentRole } from '@/lib/auth'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import EmployeesPage from './page.client'

export const metadata: Metadata = {
	title: 'Сотрудники',
}

const ServerEmployeesPage = cache(async () => {
	const employees = await getAllEmployees()
	const userRole = await currentRole()

	if (userRole !== 'ADMIN') {
		return <AccessPage />
	}

	revalidatePath('/settings/employees')
	return <EmployeesPage employees={employees} />
})

export default ServerEmployeesPage

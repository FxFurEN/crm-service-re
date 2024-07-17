'use server'

import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'

const softDelete = async (model: string, id: string) => {
	try {
		await db[model].update({
			where: { id },
			data: { deletedAt: new Date() },
		})

		revalidateTag(`deleteData`)

		return { success: `Данные успешно удалены!` }
	} catch (error) {
		console.error(`Error deleting ${model}:`, error)
		return { error: 'Что-то пошло не так' }
	}
}

export const deleteClient = async (clientId: string) => {
	return await softDelete('clients', clientId)
}

export const deleteService = async (serviceId: string) => {
	return await softDelete('service', serviceId)
}

export const deleteCategory = async (categoryId: string) => {
	return await softDelete('category', categoryId)
}

export const deleteStage = async (stageId: string) => {
	return await softDelete('stage', stageId)
}

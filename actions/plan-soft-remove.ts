import { db } from '@/lib/db'
import cron from 'node-cron'

const deleteOldRecords = async () => {
	const sevenDaysAgo = new Date()
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

	try {
		await db.clients.deleteMany({ where: { deletedAt: { lt: sevenDaysAgo } } })
		await db.service.deleteMany({ where: { deletedAt: { lt: sevenDaysAgo } } })
		await db.category.deleteMany({ where: { deletedAt: { lt: sevenDaysAgo } } })
		await db.stage.deleteMany({ where: { deletedAt: { lt: sevenDaysAgo } } })
		await db.orders.deleteMany({ where: { deletedAt: { lt: sevenDaysAgo } } })
		await db.execution.deleteMany({
			where: { deletedAt: { lt: sevenDaysAgo } },
		})
	} catch (error) {
		console.error('Error deleting old records:', error)
	}
}

cron.schedule('0 0 * * *', deleteOldRecords)

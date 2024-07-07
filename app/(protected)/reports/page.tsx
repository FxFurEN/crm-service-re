import { Metadata } from 'next'
import ReportClientPage from './page.client'

export const metadata: Metadata = {
	title: 'Отчеты',
}

const ReportPage = () => {
	return <ReportClientPage />
}

export default ReportPage

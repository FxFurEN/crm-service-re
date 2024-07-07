'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const reports = [
	{ name: 'employee-report', label: 'Отчет по сотрудникам' },
	{ name: 'date-report', label: 'Отчет по датам' },
]

const ReportClientPage = () => {
	return (
		<>
			<p className='text-2xl font-semibold text-center'>Отчеты</p>
			<ScrollArea>
				<div className='p-4'>
					{reports.map((report, index) => (
						<div key={index}>
							<Link href={`/reports/${report.name}`}>
								<Button variant='ghost' className='text-sm w-full text-left'>
									{report.label}
								</Button>
							</Link>
							{index < reports.length - 1 && <Separator className='my-2' />}
						</div>
					))}
				</div>
			</ScrollArea>
		</>
	)
}

export default ReportClientPage

import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'crm-service-re'
const APP_DEFAULT_TITLE = 'crm app'
const APP_TITLE_TEMPLATE = '%s - crm App'
const APP_DESCRIPTION = 'Best crm app in the world!'

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: '/manifest.json',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: true,
	},
}

export const viewport: Viewport = {
	themeColor: '#FFFFFF',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth()

	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={inter.className}>
					<Toaster />
					{children}
				</body>
			</html>
		</SessionProvider>
	)
}

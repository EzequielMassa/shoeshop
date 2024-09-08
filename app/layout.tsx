import { ourFileRouter } from '@/app/api/uploadthing/core'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { extractRouterConfig } from 'uploadthing/server'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ShoeShop',
	description: 'ShoeShop is a platform for selling shoes',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				{children}
			</body>
		</html>
	)
}

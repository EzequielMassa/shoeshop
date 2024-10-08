'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const navbarLinks = [
	{ id: 0, name: 'Home', href: '/' },
	{ id: 1, name: 'All Products', href: '/products/all' },
	{ id: 2, name: 'Men', href: '/products/men' },
	{ id: 3, name: 'Women', href: '/products/women' },
	{ id: 4, name: 'Kids', href: '/products/kids' },
]

function NavbarLinks() {
	const location = usePathname()

	return (
		<div className='flex flex-col md:flex-row  justify-center items-end md:items-center gap-x-2 ml-8'>
			{navbarLinks.map((item) => (
				<Link
					key={item.id}
					href={item.href}
					className={cn(
						location === item.href
							? 'bg-muted'
							: 'hover:bg-muted hover:bg-opacity-75',
						'group p-2 font-medium rounded-md'
					)}>
					{item.name}
				</Link>
			))}
		</div>
	)
}
export default NavbarLinks

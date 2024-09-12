import NavbarLinks from '@/app/components/storefront/NavbarLinks'
import UserDropdown from '@/app/components/storefront/UserDropdown'
import { Cart } from '@/app/lib/interfaces'
import { redis } from '@/app/lib/redis'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
	LoginLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { MenuIcon, ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'

async function Navbar() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	const cart: Cart | null = await redis.get(`cart-${user?.id}`)

	const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

	return (
		<nav className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between'>
			<div className='flex justify-between md:justify-start w-full items-center'>
				<Link href='/'>
					<h1 className='text-black font-bold text-xl lg:text-3xl'>
						Shoe<span className='text-primary'>Shop</span>
					</h1>
				</Link>
				<div className='hidden md:flex'>
					<NavbarLinks />
				</div>
				<div className='flex md:hidden'>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant='outline' size='icon' className='lg:hidden'>
								<MenuIcon className='h-6 w-6' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-full h-fit'>
							<div className='grid gap-2 py-6'>
								<NavbarLinks />
							</div>
							<div className='flex flex-col md:flex-row  items-end justify-end space-y-4'>
								{user ? (
									<>
										<Link
											href={'/bag'}
											className='group p-2 flex items-center mr-2'>
											<ShoppingBagIcon className='h-6 w-6 text-gray-400 group-hover:text-gray-500' />
											<span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
												{total}
											</span>
										</Link>
										<UserDropdown
											email={user.email as string}
											name={user.given_name as string}
											userImage={
												user.picture ??
												`https://avatar.vercel.sh/${user.given_name}`
											}
										/>
									</>
								) : (
									<div className='flex flex-col md:flex-row flex-1 items-end justify-center md:justify-end md:space-x-2'>
										<Button variant='ghost' asChild>
											<a
												href='https://github.com/EzequielMassa/shoeshop'
												target='_blank'
												rel='noopener'>
												Read the docs
											</a>
										</Button>
										<Button variant='ghost' asChild>
											<LoginLink>Sign in</LoginLink>
										</Button>
										<Button variant='ghost' asChild>
											<RegisterLink>Create Account</RegisterLink>
										</Button>
									</div>
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
			<div className='hidden md:flex items-center'>
				{user ? (
					<>
						<Link href={'/bag'} className='group p-2 flex items-center mr-2'>
							<ShoppingBagIcon className='h-6 w-6 text-gray-400 group-hover:text-gray-500' />
							<span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
								{total}
							</span>
						</Link>
						<UserDropdown
							email={user.email as string}
							name={user.given_name as string}
							userImage={
								user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
							}
						/>
					</>
				) : (
					<div className='hidden md:flex md:flex-1 md:items-center  md:justify-end md:space-x-2'>
						<Button variant='ghost' asChild>
							<a
								href='https://github.com/EzequielMassa/shoeshop'
								target='_blank'
								rel='noopener'>
								Read the docs
							</a>
						</Button>
						<span className='h-6 w-px bg-gray-200'></span>
						<Button variant='ghost' asChild>
							<LoginLink>Sign in</LoginLink>
						</Button>
						<span className='h-6 w-px bg-gray-200'></span>
						<Button variant='ghost' asChild>
							<RegisterLink>Create Account</RegisterLink>
						</Button>
					</div>
				)}
			</div>
		</nav>
	)
}
export default Navbar

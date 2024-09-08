import Footer from '@/app/components/storefront/Footer'
import Navbar from '@/app/components/storefront/Navbar'

function StoreFrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
				{children}
			</main>
			<Footer />
		</>
	)
}
export default StoreFrontLayout

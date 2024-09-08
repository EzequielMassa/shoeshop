import CategorySelection from '@/app/components/storefront/CategorySelection'
import FeaturedProducts from '@/app/components/storefront/FeaturedProducts'
import Hero from '@/app/components/storefront/Hero'
import Navbar from '@/app/components/storefront/Navbar'

function IndexPage() {
	return (
		<div>
			<Hero />
			<CategorySelection />
			<FeaturedProducts />
		</div>
	)
}
export default IndexPage

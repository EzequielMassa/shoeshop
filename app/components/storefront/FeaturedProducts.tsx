import ProductCard, {
	LoadingProductCard,
} from '@/app/components/storefront/ProductCard'
import prisma from '@/app/lib/db'
import { Suspense } from 'react'
import { unstable_noStore as noStore } from 'next/cache'

async function getData() {
	const data = await prisma.product.findMany({
		where: {
			status: 'published',
			isFeatured: true,
		},
		select: {
			id: true,
			name: true,
			description: true,
			price: true,
			images: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 3,
	})
	return data
}

function FeaturedProducts() {
	return (
		<>
			<h2 className='text-2xl font-extrabold tracking-tight'>Featured Items</h2>
			<Suspense fallback={<LoadingRows />}>
				<LoadFeaturedProducts />
			</Suspense>
		</>
	)
}
export default FeaturedProducts

async function LoadFeaturedProducts() {
	noStore()
	const data = await getData()
	return (
		<div className='mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
			{data.map((item) => (
				<ProductCard key={item.id} item={item} />
			))}
		</div>
	)
}
{
}
function LoadingRows() {
	return (
		<div className='mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
			<LoadingProductCard />
			<LoadingProductCard />
			<LoadingProductCard />
		</div>
	)
}

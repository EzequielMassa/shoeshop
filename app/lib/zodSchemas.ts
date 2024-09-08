import { z } from 'zod'

export const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	status: z.enum(['draft', 'published', 'archived']),
	price: z.number().min(1, 'Price must be greater or equal to 1'),
	images: z.array(z.string()).min(1, 'Please select at least one image.'),
	category: z.enum(['men', 'women', 'kids']),
	isFeatured: z.boolean().optional(),
})

export const bannerSchema = z.object({
	title: z.string(),
	imageString: z.string(),
})

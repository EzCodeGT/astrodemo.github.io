import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			// Transform string to Date object
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// Added new fields
			draft: z.boolean(),
			snippet: z.string(),
			image: z.object({
				src: z.string(),
				alt: z.string(),
			}).optional(),
			publishDate: z.string().transform((str) => new Date(str)),
			author: z.string().default("YourCompany"),
			category: z.string(),
			tags: z.array(z.string()),
		}),
});

export const collections = { blog };

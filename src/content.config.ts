import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const menus = defineCollection({
  loader: glob({ base: "./src/content/menus", pattern: "*.json" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      enabled: z.boolean().optional(),
      unavailableMessage: z.string().min(1),
      images: z.array(
        z.object({
          image: image(),
          altText: z.string().min(1),
          caption: z.string().optional(),
        }),
      ),
    }),
});

export const collections = { menus };

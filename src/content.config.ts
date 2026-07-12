import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const escritos = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/escritos" }),
    schema: z.object({
      titulo: z.string(),
      dataPub: z.date(),
      descricao: z.string().optional(),
      autor: z.string(),
      imagem: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string()).optional()
    })
});
export const collections = { escritos: escritos };

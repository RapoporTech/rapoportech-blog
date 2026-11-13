// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte()],
  site: 'https://github.com/RapoporTech/rapoportech-blog',
  vite: {
    build: {
      cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    },
  },
});

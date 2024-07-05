import { defineConfig } from 'astro/config';

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [
    (await import("astro-compress")).default({
			CSS: true,
			HTML: true,
			Image: true,
			JavaScript: true,
			SVG: true,
		}),
  ]
});
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
	alias:{
		$components:'src/lib/components',
		$fonts:'static/fonts'
	}
  },
  preprocess: vitePreprocess()
};
export default config;
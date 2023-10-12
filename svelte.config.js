import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';


/** @type {import('@sveltejs/kit').Config} */
const config = {
		preprocess: vitePreprocess(),
		kit: {
			adapter: adapter(),
//        	paths: {
//				base : "",
//            	base: process.env.NODE_ENV === 'production' ? '/sveltekit-github-pages' : '',
//        	}
	}
};

config.paths = { base: process.argv.includes('dev') ? '' : process.env.BASE_PATH }

export default config;

import { loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
import uniReadPagesV3Plugin from './sheep/router/utils/uni-read-pages-v3';
import mpliveMainfestPlugin from './sheep/libs/mplive-manifest-plugin';


// https://vitejs.dev/config/
export default (command, mode) => {
	const env = loadEnv(mode, __dirname, 'SHOPRO_');
	return {
		envPrefix: "SHOPRO_",
		plugins: [
			uni(),
			// viteCompression({
			// 	verbose: false
			// }),
			uniReadPagesV3Plugin({
				pagesJsonDir: path.resolve(__dirname, './pages.json'),
				includes: ['path', 'aliasPath', 'name', 'meta'],
			}),
			mpliveMainfestPlugin(env.SHOPRO_MPLIVE_ON)
		],
		server: {
			host: true,
			// open: true,
			port: env.SHOPRO_DEV_PORT,
			hmr: {
				overlay: true,
			},
			proxy: {
				'/app-api': {
					target: 'http://127.0.0.1:48080',
					changeOrigin: true,
					secure: false,
					configure: (proxy, _options) => {
						proxy.on('error', (err, _req, _res) => {
							console.log('proxy error', err);
						});
						proxy.on('proxyReq', (proxyReq, req, _res) => {
							console.log('Sending Request to the Target:', req.method, req.url);
						});
						proxy.on('proxyRes', (proxyRes, req, _res) => {
							console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
						});
					},
				},
				'/admin-api': {
					target: 'http://127.0.0.1:48080',
					changeOrigin: true,
					secure: false,
				}
			}
		},
	};
};

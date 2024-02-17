const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		IS_DEV: JSON.stringify(isDev),
	},
	// i18n: {
	// 	locales: ['ru', 'en'],
	// 	defaultLocale: 'ru',
	// },
	// webpack: (config, options) => {
	// 	const typescriptLoader = {
	// 		test: /\.tsx?$/,
	// 		use: 'ts-loader',
	// 		exclude: /node_modules/,
	// 	};
	// 	config.module.rules.push(typescriptLoader);
	// 	return config;
	// },
	//
	// sassOptions: {
	// 	includePaths: [path.join(__dirname, 'styles')],
	// },
};

export default nextConfig;

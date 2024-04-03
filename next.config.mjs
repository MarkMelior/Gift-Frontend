import buildLoaders from './config/webpack/buildLoaders.mjs';
import buildPlugins from './config/webpack/buildPlugins.mjs';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		IS_DEV: JSON.stringify(isDev),
		API: process.env.API,
	},
	webpack: (config, options) => {
		config.module.rules.push(...buildLoaders(isDev));
		config.plugins.push(...buildPlugins(config, isDev));

		return config;
	},
	trailingSlash: true,
};

export default nextConfig;

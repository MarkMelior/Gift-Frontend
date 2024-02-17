import createNextIntlPlugin from 'next-intl/plugin';
import buildLoaders from './config/webpack/buildLoaders.js';
import buildPlugins from './config/webpack/buildPlugins.js';

const isDev = process.env.NODE_ENV === 'development';

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		IS_DEV: JSON.stringify(isDev),
	},
	webpack: (config, options) => {
		config.module.rules.push(...buildLoaders(isDev));
		config.plugins.push(...buildPlugins(config, isDev));

		return config;
	},
	// i18n: {
	// 	locales: ['ru', 'en'],
	// 	defaultLocale: 'ru',
	// },
};

export default withNextIntl(nextConfig);

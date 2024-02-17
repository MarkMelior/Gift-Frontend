import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default function buildPlugins(config, isDev) {
	const plugins = [];

	if (config.name === 'client' && process.env.ANALYZE) {
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				openAnalyzer: true,
				reportFilename: `./analyze/client.html`,
			}),
		);
	}

	return plugins;
}

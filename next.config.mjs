/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API: process.env.NEXT_PUBLIC_API,
		UPLOADS: process.env.NEXT_PUBLIC_UPLOADS,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '/uploads/**',
			},
		],
	},
};

export default nextConfig;

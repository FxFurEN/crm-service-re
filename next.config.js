/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
})

const nextConfig = {
	output: 'standalone',
	async redirects() {
		return [
			{
				source: '/',
				destination: '/auth/login',
				permanent: true,
				basePath: false,
			},
		]
	},
	typescript: {
		ignoreBuildErrors: true,
	},
}

module.exports = withPWA(nextConfig)

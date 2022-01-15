module.exports = {
	async headers() {
		return [
			{
				source: '/.well-known/matrix/:clientOrServer',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/channels',
				destination: '/channels/@me',
				permanent: false,
			},
		];
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.node = {
				...config.node,
				global: true,
			};
			config.resolve = {
				...config.resolve,
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				fallback: {
					...config.resolve.fallback,
					crypto: require.resolve('crypto-browserify'),
					path: require.resolve('path-browserify'),
					fs: false,
					stream: require.resolve('stream-browserify'),
					util: require.resolve('util/'),
					assert: require.resolve('assert/'),
				},
			};
		}
		config.output.webassemblyModuleFilename = 'olm.wasm';
		config.experiments = { asyncWebAssembly: true };

		return config;
	},
};

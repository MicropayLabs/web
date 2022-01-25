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
				source: '/_next/static/chunks/pages/olm.wasm',
				destination: '/olm.wasm',
				permanent: false,
			},
			{
				source: '/channels',
				destination: '/channels/@me',
				permanent: false,
			},
		];
	},
	webpack: (config, {}) => {
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
				fs: require.resolve('browserify-fs'),
				stream: require.resolve('stream-browserify'),
				util: require.resolve('util/'),
			},
		};
		// config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
		config.experiments = {
			...config.experiments,
			asyncWebAssembly: true,
			layers: true,
			topLevelAwait: true,
		};

		return config;
	},
};

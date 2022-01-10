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
};

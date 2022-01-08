module.exports = {
	async headers() {
		return [
			{
				source: '/.well-known/matrix/*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},
};

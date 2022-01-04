module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				zinc: {
					150: '#EDEDEE',
					250: '#DCDCE0',
					750: '#323236',
					825: '#222225',
					850: '#1C1C1F',
					950: '#111115',
				},
			},
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Helvetica',
					'Arial',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
				],
				mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier'],
				display: [
					'InterUI',
					'-apple-system',
					'BlinkMacSystemFont',
					'Helvetica Neue',
					'Segoe UI',
					'Oxygen',
					'Ubuntu',
					'Cantarell',
					'Open Sans',
				],
			},
			fontSize: {
				'2xs': '.65rem',
			},
		},
	},
	plugins: [],
	presets: [require('./primer.config.js')],
};

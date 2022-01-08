import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html className='bg-light-canvas dark:bg-dark-canvas-inset'>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<meta property="og:title" content="Micropay" />
					<meta
						property="og:description"
						content="Micropay makes it easy to make a DAO on Ethereum."
					/>
					<meta property="og:image" content="/android-chrome-512x512.png" />
					<meta name="twitter:card" content="/android-chrome-512x512.png" />
					<meta name="twitter:title" content="Micropay" />
					<meta
						name="twitter:description"
						content="Micropay makes it easy to make a DAO on Ethereum."
					/>
					<meta name="twitter:image" content="/android-chrome-192x192.png" />
				</Head>
				<body className="h-full overflow-hidden">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

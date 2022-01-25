import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
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
						content="Scalable infrastructure for decentralized communities."
					/>
					<meta property="og:image" content="/android-chrome-512x512.png" />
					<meta name="twitter:card" content="/android-chrome-512x512.png" />
					<meta name="twitter:title" content="Micropay" />
					<meta
						name="twitter:description"
						content="Scalable infrastructure for decentralized communities."
					/>
					<meta name="twitter:image" content="/android-chrome-192x192.png" />
				</Head>
				<body
					id="root"
					className="system-theme h-screen overflow-hidden"
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

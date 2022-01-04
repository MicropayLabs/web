import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html className="h-full bg-light-canvas dark:bg-dark-canvas">
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
					<link rel="manifest" href="/site.webmanifest"/>
					<title>Micropay</title>
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

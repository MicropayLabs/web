import '../styles/tailwind.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Micropay</title>
			</Head>
			<Component {...pageProps} />;
		</>
	);
}

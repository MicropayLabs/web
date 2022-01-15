import '../styles/tailwind.css';
import '../styles/index.scss';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Micropay</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0 maximum-scale=1.0 user-scalable=no"
				/>
				<meta name="name" content="Micropay" />
				<meta
					name="description"
					content="Scalable infrastructure for decentralized organizations."
				/>
				<meta name="keywords" content="micropay, dao, layer 2, ethereum, zk" />

				<meta property="og:title" content="Micropay" />
				<meta property="og:url" content="https://micropay.gg" />
				<meta property="og:image" content="/favicon-32x32.png" />
				<meta
					property="og:description"
					content="Scalable infrastructure for decentralized organizations."
				/>
				<meta name="theme-color" content="#000000"></meta>
			</Head>
			<Component {...pageProps} />;
		</>
	);
}

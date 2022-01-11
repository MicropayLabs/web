import React, { useEffect, useState } from 'react';
import { Landing } from '@components/landing';
import { useMatrixClient, initMatrixClient } from '@lib/matrix';
import { useRouter } from 'next/router';

export const LOCAL_STORAGE_KEY = 'loginToken';
export default function Home() {
	const matrixClient = useMatrixClient();
	const [jwt, setJWT] = useState<string>();
	const router = useRouter();

	useEffect(() => {
		console.log('matrixClient', matrixClient);
		if (jwt && matrixClient) {
			router.push('/channels/@me');
		}
	}, [matrixClient]);

	useEffect(() => {
		// Try to get item from local storage when the page first loads
		const tokenFromStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
		setJWT(tokenFromStorage);
		initMatrixClient(tokenFromStorage);
	}, []);

	const handleLoggedIn = ({ loginToken }) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, loginToken);
		setJWT(loginToken);
		initMatrixClient(loginToken);
	};

	return (
		<div className="h-screen flex flex-row">
			{(!jwt || !matrixClient) && <Landing onLoggedIn={handleLoggedIn} />}
		</div>
	);
}

import React, { useEffect, useState } from 'react';
import decodeJWT from 'jwt-decode';
import LeftContextMenu from '@components/left-context-menu/LeftContextMenu';
import { TokenPayload } from '../../api/auth';
import { useMatrixClient, initMatrixClient } from '@lib/matrix';
import EmptyState from '@components/empty-state/EmptyState';

export default function Home() {
	const LOCAL_STORAGE_KEY = 'loginToken';
	const matrixClient = useMatrixClient();
	const [jwt, setJWT] = useState<string>();

	useEffect(() => {
		console.log('matrixClient', matrixClient);
	}, [matrixClient]);

	useEffect(() => {
		// Try to get item from local storage when the page first loads
		const tokenFromStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
		setJWT(tokenFromStorage);
		initMatrixClient(tokenFromStorage);
	}, []);

	const handleLoggedOut = () => {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		setJWT(undefined);
	};

	return (
		<div className="h-screen flex flex-row">
			{jwt && matrixClient && (
				<>
					<LeftContextMenu
						address={decodeJWT<TokenPayload>(jwt).address}
						onLogout={handleLoggedOut}
					/>
					<EmptyState />
				</>
			)}
		</div>
	);
}

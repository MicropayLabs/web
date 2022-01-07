import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import UserMenu from './UserMenu';
import { useMatrixClient } from '@lib/matrix';
import Category from './DirectMessages';

export default function LeftContextMenu({ address, onLogout }) {
	const [rooms, setRooms] = useState([]);
	const matrixClient = useMatrixClient();

	useEffect(() => {
		if (matrixClient) {
			setRooms(matrixClient.getRooms());
			matrixClient.on('m.room.create', (_event) =>
				setRooms(matrixClient.getRooms())
			);
			matrixClient.on('m.room.member', (_event) =>
				setRooms(matrixClient.getRooms())
			);
		}
	}, [matrixClient]);

	return (
		<div
			className={classnames(
				'flex flex-col py-3 pl-4 pr-2 gap-3 w-64 h-full',
				'bg-dark-canvas dark:bg-dark-canvas-muted'
			)}
		>
			<Category title="Direct Messages" />
			<div className="flex-1" />
			<UserMenu address={address} onLogout={onLogout} />
		</div>
	);
}

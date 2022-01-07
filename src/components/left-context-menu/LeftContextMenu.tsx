import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import UserMenu from './UserMenu';
import { useMatrixClient } from '@lib/matrix';

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
				'bg-dark-canvas dark:bg-dark-canvas-subtle'
			)}
		>
			<span
				className={classnames(
					'flex flex-row items-center justify-between mt-4'
				)}
			>
				<span
					className={classnames(
						'text-light-fg-muted dark:text-dark-fg-muted',
						'uppercase'
					)}
				>
					Direct Messages
				</span>
				<button
					className={classnames(
						'text-xl uppercase mr-1',
						'text-light-fg-muted dark:text-dark-fg-muted'
					)}
				>
					+
				</button>
			</span>
			<div className="flex flex-col gap-2">
				{rooms.map((room) => (
					<div
						key={room.roomId}
						className={classnames(
							'flex flex-row items-center justify-between text-md',
							'text-light-fg dark:text-dark-fg'
						)}
					>
						<span>{room.name.substring(0, 10)}</span>
						<button
							className={classnames(
								'text-3xl mr-1',
								'text-light-fg-muted dark:text-dark-fg-muted'
							)}
							onClick={() => matrixClient.leave(room.roomId)}
						>
							-
						</button>
					</div>
				))}
			</div>
			<span
				className={classnames(
					'flex flex-row items-center justify-between mt-4'
				)}
			>
				<span
					className={classnames(
						'text-light-fg-muted dark:text-dark-fg-muted',
						'uppercase'
					)}
				>
					Communities
				</span>
				<button
					className={classnames(
						'text-xl uppercase mr-1',
						'text-light-fg-muted dark:text-dark-fg-muted'
					)}
				>
					+
				</button>
			</span>
			<div className="flex flex-col gap-2">
				{rooms.map((room) => (
					<div
						key={room.roomId}
						className={classnames(
							'flex flex-row items-center justify-between text-md',
							'text-light-fg dark:text-dark-fg'
						)}
					>
						<span>{room.name}</span>
						<button
							className={classnames(
								'text-3xl mr-1',
								'text-light-fg-muted dark:text-dark-fg-muted'
							)}
							onClick={() => matrixClient.leave(room.roomId)}
						>
							-
						</button>
					</div>
				))}
			</div>
			<div className="flex-1" />
			<UserMenu address={address} onLogout={onLogout} />
		</div>
	);
}

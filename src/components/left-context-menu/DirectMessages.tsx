import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { parseMatrixRoom, useMatrixClient } from '@lib/matrix';
import { Room } from 'matrix-js-sdk';
import { useRouter } from 'next/router';

export default function DirectMessages(): JSX.Element {
	const [rooms, setRooms] = useState<Room[]>([]);
	const matrixClient = useMatrixClient();
	const router = useRouter();

	useEffect(() => {
		if (matrixClient) {
			setRooms(matrixClient.getVisibleRooms());
			matrixClient.on('event', (event) => {
				if (event.getType() === 'm.room.member') {
					const { membership } = event.getContent();
					if (membership === 'join') {
						setRooms(matrixClient.getVisibleRooms());
					} else if (membership === 'leave') {
						matrixClient
							.forget(event.getRoomId())
							.then(() => setRooms(matrixClient.getVisibleRooms()));
					}
				} else if (event.getType() === 'm.room.name') {
					setRooms(matrixClient.getVisibleRooms());
				}
			});
		}
		return () => {
			matrixClient.removeAllListeners();
		};
	}, [matrixClient]);

	return (
		<>
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
			</span>
			<div className="flex flex-col gap-2">
				{rooms.map((room) => (
					<div
						key={room.roomId}
						className={classnames(
							'flex flex-row items-center justify-between text-md',
							'text-light-fg dark:text-dark-fg',
							'cursor-pointer'
						)}
					>
						<span
							onClick={() =>
								router.push(`/channels/@me/${parseMatrixRoom(room.roomId)}`)
							}
						>
							{room && room.name ? room.name.substring(0, 18) : 'Room Name'}
						</span>
						<button
							className={classnames(
								'text-3xl mr-1',
								'text-light-fg-muted dark:text-dark-fg-muted'
							)}
							onClick={() => {
								matrixClient.leave(room.roomId);
								if (
									matrixClient.getRoom(room.roomId).getJoinedMemberCount() === 0
								) {
									matrixClient.store.removeRoom(room.roomId);
								}
							}}
						>
							-
						</button>
					</div>
				))}
			</div>
		</>
	);
}

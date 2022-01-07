import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useMatrixClient } from '@lib/matrix';

export default function Category({ title }): JSX.Element {
	const [dms, setDMS] = useState([]);
	const matrixClient = useMatrixClient();

	useEffect(() => {
		if (matrixClient) {
			setDMS(matrixClient.getRooms());
		}
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
					{title}
				</span>
			</span>
			<div className="flex flex-col gap-2">
				{dms.map((room) => (
					<div
						key={room.roomId}
						className={classnames(
							'flex flex-row items-center justify-between text-md',
							'text-light-fg dark:text-dark-fg'
						)}
					>
						<span>{room.name.substring(0, 20)}</span>
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

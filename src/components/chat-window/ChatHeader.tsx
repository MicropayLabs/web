import { parseMatrixRoom, useMatrixClient } from '@lib/matrix';
import classnames from 'classnames';
import { useState } from 'react';

export default function ChatHeader({ roomId, name, selfMembership }) {
	const matrixClient = useMatrixClient();
	const [didJoinRoom, setDidJoinRoom] = useState(false);
	return (
		<header
			className={classnames(
				'flex flex-row gap-4 mx-4 mt-4 p-3 rounded-lg z-10',
				'border-light-border dark:border-dark-border',
				'bg-light-canvas-inset dark:bg-dark-canvas'
			)}
		>
			<div
				className={classnames(
					'text-xl my-auto',
					'text-light-fg-emphasis, dark:text-dark-fg-emphasis'
				)}
			>
				{parseMatrixRoom(name)}
			</div>
			<span className="flex-1" />
			{didJoinRoom || selfMembership === 'invite' && (
				<div className="flex flex-col justify-center mx-auto">
					<button
						className={classnames(
							'px-4 py-2 rounded-md',
							'text-light-green-fg dark:text-dark-green-fg',
							'bg-light-green-subtle dark:bg-dark-green-subtle',
							'border border-light-green-emphasis dark:border-dark-green-emphasis',
							'hover:border-light-green-fg dark:hover:border-dark-green-fg',
							'shadow-sm shadow-light-shadow-sm dark:shadow-dark-shadow-sm',
							'hover:shadow-md hover:shadow-light-shadow-md dark:hover:shadow-dark-shadow-md'
						)}
						onClick={() => matrixClient.joinRoom(roomId).then(() => setDidJoinRoom(true))}
					>
						{'Join Room'}
					</button>
				</div>
			)}
		</header>
	);
}

import { parseMatrixRoom, useMatrixClient } from '@lib/matrix';
import classnames from 'classnames';

export default function ChatHeader({ room }) {
	const matrixClient = useMatrixClient();
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
				{parseMatrixRoom(room.name)}
			</div>
			<span className="flex-1" />
			{room.selfMembership === 'invite' && (
				<div className="flex flex-col justify-center mx-auto">
					<button
						className={classnames(
							'px-4 py-2 rounded-md',
							'text-light-orange-fg dark:text-dark-orange-fg',
							'bg-light-orange-subtle dark:bg-dark-orange-subtle',
							'border border-light-orange-emphasis dark:border-dark-orange-emphasis',
							'hover:border-light-orange-fg dark:hover:border-dark-orange-fg',
							'shadow-sm shadow-light-shadow-sm dark:shadow-dark-shadow-sm',
							'hover:shadow-md hover:shadow-light-shadow-md dark:hover:shadow-dark-shadow-md'
						)}
						onClick={() => matrixClient.joinRoom(room.roomId)}
					>
						{'Join Room'}
					</button>
				</div>
			)}
		</header>
	);
}

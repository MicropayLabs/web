import { parseMatrixRoom } from '@lib/matrix';
import classnames from 'classnames';

export default function ChatHeader({ roomName }) {
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
				{parseMatrixRoom(roomName)}
			</div>
			<span className="flex-1" />
		</header>
	);
}

import { parseMatrixRoom } from '@lib/matrix';
import { Jazzicon } from '@ukstv/jazzicon-react';
import classnames from 'classnames';

export default function ChatHeader({ room }) {
	const { name, roomId } = room ?? { name: 'Room Name', roomId: 'placeholder' };

	return (
		<header
			className={classnames(
				'flex flex-row gap-4 mx-4 mt-4 p-3 rounded-lg z-10',
				'border-light-border dark:border-dark-border',
				'bg-light-canvas-inset dark:bg-dark-canvas'
			)}
		>
			<Jazzicon className="w-8 h-8 opacity-75" address={roomId} />
			<div
				className={classnames(
					'text-xl my-auto',
					'text-light-fg-emphasis, dark:text-dark-fg-emphasis'
				)}
			>
				{parseMatrixRoom(name)}
			</div>
			<span className="flex-1" />
		</header>
	);
}

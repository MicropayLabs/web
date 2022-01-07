import React, { useState, useEffect } from 'react';
import { EmojiHappyIcon, FireIcon, PaperClipIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { useMatrixClient } from '@lib/matrix';
import classnames from 'classnames';

export default function ChatFooter() {
	const matrixClient = useMatrixClient();
	const [message, setMessage] = useState('');
	const [currentRoom, setCurrentRoom] = useState(null);

	const handleMessageSendResponse = (err, res) => {
		if (err) {
			console.log(err);
		} else if (res) {
			console.log('response', res);
		}
	};

	useEffect(() => {
		if (matrixClient) {
			const rooms = matrixClient.getRooms();
			setCurrentRoom(rooms[0]);
		}
	}, [matrixClient]);

	return (
		<footer className="px-4 pb-4 mb-1 z-10">
			<div
				className={classnames(
					'flex flex-row gap-4 p-4 rounded-lg',
					'bg-light-canvas-inset dark:bg-dark-canvas-subtle'
				)}
			>
				<PlusCircleIcon
					className={classnames(
						'my-auto h-6 w-6 cursor-not-allowed',
						'text-light-neutral-muted dark:text-dark-neutral-muted'
					)}
					aria-hidden="true"
				/>
				<input
					className={classnames(
						'flex-1 focus:outline-none',
						'text-light-fg dark:text-dark-fg',
						'placeholder-light-fg-subtle dark:placeholder-dark-fg-subtle',
						'bg-light-canvas-inset dark:bg-dark-canvas-subtle'
					)}
					type="text"
					placeholder="Type a message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(e: any) => {
						if (!e) {
							e = window.event;
						}
						var keyCode = e.code || e.key;
						if (keyCode == 'Enter') {
							matrixClient.sendEvent(
								currentRoom.roomId,
								'm.room.message',
								{ body: message, msgtype: 'm.text' },
								'',
								handleMessageSendResponse
							);
							setMessage(''); // Message pending
						}
					}}
				/>
				<PaperClipIcon
					className={classnames(
						'my-auto h-6 w-6 cursor-not-allowed',
						'text-light-neutral-muted dark:text-dark-neutral-muted'
					)}
					aria-hidden="true"
				/>
				<EmojiHappyIcon
					className={classnames(
						'my-auto h-6 w-6 cursor-not-allowed',
						'text-light-neutral-muted dark:text-dark-neutral-muted'
					)}
					aria-hidden="true"
				/>
				<FireIcon
					className={classnames(
						'my-auto h-6 w-6 cursor-not-allowed',
						'text-light-neutral-muted dark:text-dark-neutral-muted'
					)}
					aria-hidden="true"
				/>
			</div>
		</footer>
	);
}
